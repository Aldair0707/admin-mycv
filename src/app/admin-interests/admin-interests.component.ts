import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {
    itemCount: number = 0;
    btnTxt: string ="Agregar";
    goalText: string ="";
    isEditing: boolean = false;
    idEnEdicion: string = '';
    interests: Interests[] = [];
    myInterests: Interests = new Interests();
    
    constructor(public interestsService: InterestsService)
    {
      console.log(this.interestsService);
      this.interestsService.getInterests().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )	 
        )
      ).subscribe(data => {
        this.interests = data;
        console.log(this.interests);
        });
      }

      resetForm(confirmar = true) {
        if (!confirmar || confirm('¿Estás seguro de cancelar la edición? Se perderán los cambios no guardados.')) {
          this.myInterests = new Interests();
          this.isEditing = false;
          this.idEnEdicion = '';
        }
      }
    
      AgregarJob(){
        console.log(this.myInterests);
        this.interestsService.createInterests(this.myInterests).then(() =>{
          console.log('Created new item successfully!');
        });
      }
    
      deleteJob(id? :string){
        this.interestsService.deleteInterests(id).then(() => {
          console.log('delete item successfully!');
        });
          console.log(id);
      }
    
      updateJob() {
        if (this.isEditing && this.idEnEdicion) {
          const confirmado = confirm('¿Estás seguro de que deseas actualizar este ítem?');
          if (confirmado) {
            this.interestsService.updateInterests(this.myInterests, this.idEnEdicion).then(() => {
              console.log('Item actualizado con éxito');
              this.resetForm(false);  
            });
          }
        }
       }

      confirmDelete(id: string) {
        if (confirm('¿Estás seguro de que quieres eliminar este ítem?')) {
          this.deleteJob(id);
        }
      }
    
      editJob(id: string) {
        const item = this.interests.find(h => h.id === id);
        if (item) {
          this.myInterests = { ...item };
          this.isEditing = true;
          this.idEnEdicion = id;
        }
      }
}
