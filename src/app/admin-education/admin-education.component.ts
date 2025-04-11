import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
  itemCount: number = 0;
  btnTxt: string ="Agregar";
  goalText: string ="";
  isEditing: boolean = false;
  idEnEdicion: string = '';
  education: Education[] = [];
  myEducation: Education = new Education();

  constructor(public educationService: EducationService)
  {
    console.log(this.educationService);
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
	)	 
      )
    ).subscribe(data => {
      this.education = data;
      console.log(this.education);
    });
  }

  resetForm(confirmar = true) {
    if (!confirmar || confirm('¿Estás seguro de cancelar la edición? Se perderán los cambios no guardados.')) {
      this.myEducation = new Education();
      this.isEditing = false;
      this.idEnEdicion = '';
    }
  }

  AgregarJob(){
    console.log(this.myEducation);
    this.educationService.createEducation(this.myEducation).then(() =>{
      console.log('Created new item successfully!');
    });
  }

  deleteJob(id? :string){
    this.educationService.deleteEducation(id).then(() => {
      console.log('delete item successfully!');
    });
      console.log(id);
  }

  updateJob() {
    if (this.isEditing && this.idEnEdicion) {
      const confirmado = confirm('¿Estás seguro de que deseas actualizar este ítem?');
      if (confirmado) {
        this.educationService.updateEducation(this.myEducation, this.idEnEdicion).then(() => {
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
    const item = this.education.find(h => h.id === id);
    if (item) {
      this.myEducation = { ...item };
      this.isEditing = true;
      this.idEnEdicion = id;
    }
  }
}
