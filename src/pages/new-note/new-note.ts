import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import{ note } from "../../Services/notes";

@IonicPage()
@Component({
  selector: 'page-new-note',
  templateUrl: 'new-note.html',
})
export class NewNotePage {
  newNote = { id: null, tittle: '', description: null }

  constructor(public alertCtrl: AlertController, public noteService : note, public navCtrl: NavController, public navParams: NavParams) {}

  public createNote(){
    if(this.newNote.tittle==''){
      this.alertCtrl.create({
        title: 'This note have a error',
        message: 'No have a tittle',
        buttons: [{ text: 'OK' }]
      }).present();
    } else{
      this.newNote.id = Date.now();
      this.noteService.addNote(this.newNote, this.navParams.get('user')); 
      this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewNotePage');
  }
}
