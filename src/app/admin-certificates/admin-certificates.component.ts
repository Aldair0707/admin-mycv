import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
      itemCount: number = 0;
      btnTxt: string ="Agregar";
      goalText: string ="";
      isEditing: boolean = false;
      idEnEdicion: string = '';
      certificates: Certificates[] = [];
      myCertificates: Certificates = new Certificates();
    
      constructor(public certificatesService: CertificatesService)
      {
        console.log(this.certificatesService);
        this.certificatesService.getCertificates().snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            )	 
          )
        ).subscribe(data => {
          this.certificates = data;
          console.log(this.certificates);
        });
      }

      resetForm() {
        const confirmado = confirm('¿Estás seguro de cancelar la edición? Se perderán los cambios no guardados.');
        if (confirmado) {
          this.myCertificates = new Certificates();
          this.isEditing = false;
          this.idEnEdicion = '';
        } 
      }
    
      AgregarJob(){
        console.log(this.myCertificates);
        this.certificatesService.createCertificates(this.myCertificates).then(() =>{
          console.log('Created new item successfully!');
        });
      }
    
      deleteJob(id? :string){
        this.certificatesService.deleteCertificates(id).then(() => {
          console.log('delete item successfully!');
        });
          console.log(id);
      }
    
      updateJob() {
        if (this.isEditing && this.idEnEdicion) {
          const confirmado = confirm('¿Estás seguro de que deseas actualizar este ítem?');
          if (confirmado) {
            this.certificatesService.updateCertificates(this.myCertificates, this.idEnEdicion).then(() => {
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
        const item = this.certificates.find(h => h.id === id);
        if (item) {
          this.myCertificates = { ...item };
          this.isEditing = true;
          this.idEnEdicion = id;
        }
      }
}
