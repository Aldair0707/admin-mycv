import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
    itemCount: number = 0;
    btnTxt: string ="Agregar";
    goalText: string ="";
    isEditing: boolean = false;
    idEnEdicion: string = '';
    skills: Skills[] = [];
    mySkills: Skills = new Skills();
    
    constructor(public skillsService: SkillsService)
    {
      console.log(this.skillsService);
      this.skillsService.getSkills().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )	 
        )
      ).subscribe(data => {
        this.skills = data;
        console.log(this.skills);
        });
      }


      resetForm() {
        const confirmado = confirm('¿Estás seguro de cancelar la edición? Se perderán los cambios no guardados.');
        if (confirmado) {
          this.mySkills = new Skills();
          this.isEditing = false;
          this.idEnEdicion = '';
        } 
      }
    
      AgregarJob(){
        console.log(this.mySkills);
        this.skillsService.createSkills(this.mySkills).then(() =>{
          console.log('Created new item successfully!');
        });
      }
    
      deleteJob(id? :string){
        this.skillsService.deleteSkills(id).then(() => {
          console.log('delete item successfully!');
        });
          console.log(id);
      }
    
      updateJob() {
        if (this.isEditing && this.idEnEdicion) {
          const confirmado = confirm('¿Estás seguro de que deseas actualizar este ítem?');
          if (confirmado) {
            this.skillsService.updateSkills(this.mySkills, this.idEnEdicion).then(() => {
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
        const item = this.skills.find(h => h.id === id);
        if (item) {
          this.mySkills = { ...item };
          this.isEditing = true;
          this.idEnEdicion = id;
        }
      }
}
