import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {

  
  private dbPath = '/work-experience';

  workExperienceRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private db: AngularFirestore) {
    this.workExperienceRef = db.collection(this.dbPath);
  }

  getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workExperienceRef;
  }

  createWorkExperience(myJob: WorkExperience): any {
     return this.workExperienceRef.add({ ...myJob });
  }

  deleteWorkExperience(id? : string): Promise<void> {
     return this.workExperienceRef.doc(id).delete();
  }

  updateWorkExperience(myJob: WorkExperience, id_U?: string): Promise<void> {
    const{ id, ...jobNoId } = myJob;
    return this.workExperienceRef.doc(id_U).update(jobNoId);
  }
}
 
