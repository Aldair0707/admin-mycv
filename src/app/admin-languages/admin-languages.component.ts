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
  
    AgregarJob(){
      console.log(this.myLanguages);
      this.languagesService.createLanguages(this.myLanguages).then(() =>{
        console.log('Created new item successfully!');
      });
    }
  
    deleteJob(id? :string){
      this.languagesService.deleteLanguages(id).then(() => {
        console.log('delete item successfully!');
      });
        console.log(id);
    }
  
    updateJob(id?: string) {
      this.languagesService.updateLanguages(this.myLanguages, id).then(() => {
        console.log('update item successfully');
      });
       console.log(id);
    }

    confirmDelete(id: string) {
      if (confirm('¿Estás seguro de que quieres eliminar este ítem?')) {
        this.deleteJob(id);
      }
    }
  
    confirmUpdate(id: string) {
      if (confirm('¿Estás seguro de que quieres actualizar este ítem?')) {
        this.updateJob(id);
      }
    }
}
