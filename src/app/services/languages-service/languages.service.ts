import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/languages.model';


@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  private dbPath = '/languages';
  languagesRef: AngularFirestoreCollection<Languages>;
     
  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }
     
  getLanguages(): AngularFirestoreCollection<Languages> {
    return this.languagesRef;
  }
     
  createLanguages(myJob: Languages): any {
    return this.languagesRef.add({ ...myJob});
  }
     
  deleteLanguages(id?: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }
     
  updateLanguages(myJob: Languages, id_U?: string): Promise<void> {
    const{ id, ...jobNoId } = myJob;
   return this.languagesRef.doc(id_U).update(jobNoId);
  }
}
