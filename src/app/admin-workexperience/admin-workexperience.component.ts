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

  updateJob(id?: string) {
    this.workExperienceService.updateWorkExperience(this.myWorkExperience, id).then(() => {
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

