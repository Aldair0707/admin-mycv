import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
     itemCount: number = 0;
     btnTxt: string = "Agregar";
     goalText: string = "";
     isEditing: boolean = false;
     idEnEdicion: string = '';
     header: Header[] = [];
     myHeader: Header = new Header();
   
     constructor(public headerService: HeaderService) {
       console.log(this.headerService);
       this.headerService.getHeader().snapshotChanges().pipe(
         map(changes =>
           changes.map(c =>
             ({ id: c.payload.doc.id, ...c.payload.doc.data() })
           )
         )
       ).subscribe(data => {
         this.header = data;
         console.log(this.header);
       });
     }

     resetForm() {
      const confirmado = confirm('¿Estás seguro de cancelar la edición? Se perderán los cambios no guardados.');
      if (confirmado) {
        this.myHeader = new Header();
        this.isEditing = false;
        this.idEnEdicion = '';
      } 
     }
   
   
     deleteJob(id? :string){
       this.headerService.deleteHeader(id).then(() => {
         console.log('delete item successfully');
       });
         console.log(id);
     }
   
     updateJob() {
      if (this.isEditing && this.idEnEdicion) {
        const confirmado = confirm('¿Estás seguro de que deseas actualizar este ítem?');
        if (confirmado) {
          this.headerService.updateHeader(this.myHeader, this.idEnEdicion).then(() => {
            console.log('Item actualizado con éxito');
            this.resetForm();
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
      const item = this.header.find(h => h.id === id);
      if (item) {
        this.myHeader = { ...item };
        this.isEditing = true;
        this.idEnEdicion = id;
      }
    }
    
    
}
