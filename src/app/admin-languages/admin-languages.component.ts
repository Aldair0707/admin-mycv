import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
    itemCount: number = 0;
    btnTxt: string ="Agregar";
    goalText: string ="";
    isEditing: boolean = false;
    idEnEdicion: string = '';
    languages: Languages[] = [];
    myLanguages: Languages = new Languages();
  
    constructor(public languagesService: LanguagesService)
    {
      console.log(this.languagesService);
      this.languagesService.getLanguages().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )	 
        )
      ).subscribe(data => {
        this.languages = data;
        console.log(this.languages);
      });
    }

    resetForm(confirmar = true) {
      if (!confirmar || confirm('¿Estás seguro de cancelar la edición? Se perderán los cambios no guardados.')) {
        this.myLanguages = new Languages();
        this.isEditing = false;
        this.idEnEdicion = '';
      }
    }
  
    AgregarJob(){
      console.log(this.myLanguages);
      this.languagesService.createLanguages(this.myLanguages).then(() =>{
        console.log('Created new item successfully!');
        this.resetForm(false);
      });
    }
  
    deleteJob(id? :string){
      this.languagesService.deleteLanguages(id).then(() => {
        console.log('delete item successfully!');
      });
        console.log(id);
    }
  
    updateJob() {
      if (this.isEditing && this.idEnEdicion) {
        const confirmado = confirm('¿Estás seguro de que deseas actualizar este ítem?');
        if (confirmado) {
          this.languagesService.updateLanguages(this.myLanguages, this.idEnEdicion).then(() => {
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
      const item = this.languages.find(h => h.id === id);
      if (item) {
        this.myLanguages = { ...item };
        this.isEditing = true;
        this.idEnEdicion = id;
      }
    }
}
