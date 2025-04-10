import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Skills } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

    private dbPath = '/skills';
    skillsRef: AngularFirestoreCollection<Skills>;
       
    constructor(private db: AngularFirestore) {
     this.skillsRef = db.collection(this.dbPath);
    }
       
    getSkills(): AngularFirestoreCollection<Skills> {
     return this.skillsRef;
    }
       
    createSkills(myJob: Skills): any {
     return this.skillsRef.add({ ...myJob});
    }
       
    deleteSkills(id?: string): Promise<void> {
     return this.skillsRef.doc(id).delete();
    }
       
    updateSkills(myJob: Skills, id_U?: string): Promise<void> {
     const{ id, ...jobNoId } = myJob;
     return this.skillsRef.doc(id_U).update(jobNoId);
    }
}
