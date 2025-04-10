import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interests } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  private dbPath = '/interests';
  interestsRef: AngularFirestoreCollection<Interests>;
     
  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }
     
  getInterests(): AngularFirestoreCollection<Interests> {
    return this.interestsRef;
  }
     
  createInterests(myJob: Interests): any {
    return this.interestsRef.add({ ...myJob});
  }
     
  deleteInterests(id?: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }
     
  updateInterests(myJob: Interests, id_U?: string): Promise<void> {
    const{ id, ...jobNoId } = myJob;
    return this.interestsRef.doc(id_U).update(jobNoId);
  }
}
