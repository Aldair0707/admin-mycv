import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})

export class AdminWorkexperienceComponent {
  itemCount: number = 0;
  btnTxt: string = "Agregar";
  goalText: string = "";
  isEditing: boolean = false;
  idEnEdicion: string = '';
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();

  constructor(public workExperienceService: WorkExperienceService) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }

  resetForm(confirmar = true) {
          if (!confirmar || confirm('¿Estás seguro de cancelar la edición? Se perderán los cambios no guardados.')) {
            this.myWorkExperience = new WorkExperience();
            this.isEditing = false;
            this.idEnEdicion = '';
          }
        }

  AgregarJob(){
    console.log(this.myWorkExperience);
    this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
      console.log('Created new item successfully!');
    });
  }

  deleteJob(id? :string){
    this.workExperienceService.deleteWorkExperience(id).then(() => {
      console.log('delete item successfully');
    });
      console.log(id);
  }

  updateJob() {
    if (this.isEditing && this.idEnEdicion) {
      const confirmado = confirm('¿Estás seguro de que deseas actualizar este ítem?');
      if (confirmado) {
        this.workExperienceService.updateWorkExperience(this.myWorkExperience, this.idEnEdicion).then(() => {
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
    const item = this.workExperience.find(h => h.id === id);
    if (item) {
      this.myWorkExperience = { ...item };
      this.isEditing = true;
      this.idEnEdicion = id;
    }
  }
}

