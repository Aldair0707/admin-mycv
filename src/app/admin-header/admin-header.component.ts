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
   
     AgregarJob(){
       console.log(this.myHeader);
       this.headerService.createHeader(this.myHeader).then(() => {
         console.log('Created new item successfully!');
       });
     }
   
     deleteJob(id? :string){
       this.headerService.deleteHeader(id).then(() => {
         console.log('delete item successfully');
       });
         console.log(id);
     }
   
     updateJob(id?: string) {
       this.headerService.updateHeader(this.myHeader, id).then(() => {
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
