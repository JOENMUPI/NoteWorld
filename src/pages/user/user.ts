import { Component, ViewChild } from '@angular/core';
import { NavParams, IonicPage, NavController, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import{ note } from "../../Services/notes";
import { DetailPage } from '../detail/detail';
import { HomePage } from '../home/home';
import { NewNotePage } from '../new-note/new-note';
import { EditNotePage } from '../edit-note/edit-note';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  notes = [];
  notesAux = [];

  @ViewChild('myNav') nav : NavController
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public navParams: NavParams, public navCtrl: NavController, public noteService : note) {
    this.noteService.getNotes(this.navParams.get('user')).subscribe(not => { this.notes = not;  this.notesAux = not; });
      this.loadingCtrl.create({
        content: "Please wait...",
        duration: 1000
      }).present();
  }

  public getItems(ev: any) {
    this.notes = this.notesAux;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.notes = this.notes.filter((item) => {
        return (item.tittle.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  public presentConfirm(ide) {
    this.alertCtrl.create({
      title: 'Confirm remove',
      message: 'Do you want eliminated this note?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        }, {
          text: 'Yes',
          handler: () => { this.removeNote(ide); }
        }
      ]
    }).present();
  }

  public removeNote(ide){
    this.noteService.deleteNote(ide, this.navParams.get('user'))
  }

  public gotoDetail(ide){
    this.navCtrl.push(DetailPage , { id: ide, user: this.navParams.get('user') });
  }

  public gotoNewNote(){
    this.navCtrl.push(NewNotePage , { user: this.navParams.get('user') });
  }

  public gotoEditNote(ide){
    this.navCtrl.push(EditNotePage , { id: ide, user: this.navParams.get('user') });
  }

  public gotoHome(){
    this.modalCtrl.create(HomePage).present();
  }
}