import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ note } from "../../Services/notes";

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {
  newNote = {id: null, tittle: null, description: null };

  constructor(public noteService : note, public navCtrl: NavController, public navParams: NavParams) {
    noteService.getNote(navParams.get('id'), navParams.get('user')).subscribe((note)=>{ this.newNote =  note;});
  }

  public changeNote(){
    this.noteService.editNote(this.newNote, this.navParams.get('user'));
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditNotePage');
  }
}