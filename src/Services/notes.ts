import { Injectable }from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class note {
    constructor(public afDB: AngularFireDatabase) {}

    public getNotes(user) {
        return this.afDB.list('note/' + user + '/').valueChanges();
    }

    public getNote(ide, user) {
        return this.afDB.object('note/' + user + '/' + ide).valueChanges();  
    }
    
    public addNote(note, user) {
        this.afDB.database.ref('note/' + user + '/' + note.id).set(note);
    }

    public editNote(note, user) {
        this.afDB.database.ref('note/' + user + '/' + note.id).set(note);
    }

    public deleteNote(ide, user) {
        this.afDB.database.ref('note/' + user + '/' + ide).remove();
    }
}