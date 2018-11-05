import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { note } from '../../Services/notes';
import { EditNotePage } from '../edit-note/edit-note';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  newNote = {id: null, tittle: null, description: null };
  show = true;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public noteService : note) {
    noteService.getNote(navParams.get('id'), navParams.get('user')).subscribe((note)=>{ this.newNote =  note;});
  }

  public removeNote(){
    this.show = false;
    this.noteService.deleteNote(this.newNote.id, this.navParams.get('user'))
    this.navCtrl.pop();
  }

  public presentConfirm() {
    this.alertCtrl.create({
      title: 'Confirm remove',
      message: 'Do you want eliminated this note?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {}
      }, {
        text: 'Yes',
        handler: () => { this.removeNote(); }
      }]
    }).present();
  }

  public gotoEditNote(){
    this.navCtrl.push(EditNotePage , { id: this.navParams.get('id'), user: this.navParams.get('user') });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
} 