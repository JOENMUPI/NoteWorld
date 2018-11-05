import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ note } from "../../Services/notes";

@IonicPage()
@Component({
  selector: 'page-new-note',
  templateUrl: 'new-note.html',
})
export class NewNotePage {
  newNote = { id: null, tittle: null, description: null }

  constructor(public noteService : note, public navCtrl: NavController, public navParams: NavParams) {}

  public createNote(){
    this.newNote.id = Date.now();
    this.noteService.addNote(this.newNote, this.navParams.get('user')); 
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewNotePage');
  }
}
