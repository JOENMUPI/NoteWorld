import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import{ note } from "../../Services/notes";

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {
  newNote = {id: null, tittle: '', description: null };

  constructor(public alertCtrl: AlertController, public noteService : note, public navCtrl: NavController, public navParams: NavParams) {
    try{ 
      noteService.getNote(navParams.get('id'), navParams.get('user')).subscribe((note)=>{ 
        this.newNote = JSON.parse(JSON.stringify(note)); 
      }); 
    } catch(e){ console.log(e); }
  }

  public changeNote(){
    if(this.newNote.tittle==''){
      this.alertCtrl.create({
        title: 'This note have a error',
        message: 'No have a tittle',
        buttons: [{ text: 'OK' }]
      }).present();
    } else{
      this.noteService.editNote(this.newNote, this.navParams.get('user'));
      this.navCtrl.pop();
    }
  }
}