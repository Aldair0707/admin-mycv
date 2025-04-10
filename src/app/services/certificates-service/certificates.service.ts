import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Certificates } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

     private dbPath = '/certificates';
     certificatesRef: AngularFirestoreCollection<Certificates>;
   
     constructor(private db: AngularFirestore) {
       this.certificatesRef = db.collection(this.dbPath);
     }
   
     getCertificates(): AngularFirestoreCollection<Certificates> {
       return this.certificatesRef;
     }
   
     createCertificates(myJob: Certificates): any {
       return this.certificatesRef.add({ ...myJob});
     }
   
     deleteCertificates(id?: string): Promise<void> {
       return this.certificatesRef.doc(id).delete();
     }
   
     updateCertificates(myJob: Certificates, id_U?: string): Promise<void> {
         const{ id, ...jobNoId } = myJob;
         return this.certificatesRef.doc(id_U).update(jobNoId);
     }
     
}
