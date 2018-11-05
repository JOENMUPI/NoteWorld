import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { note } from "../../Services/notes";
import { UserPage } from '../user/user';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = { usr: null, pass: null };

  constructor(public afAuth: AngularFireAuth, public modalCtrl: ModalController, public noteService: note, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {}

  public presentConfirm() {
    this.alertCtrl.create({
      title: 'Confirm register',
      message: 'Welcome to NoteWorld ' + this.user.usr + '!',
      buttons: [{
        text: 'Thanks!',
        handler: () => { this.navCtrl.setRoot(UserPage , { user: this.user.usr }) }
      }]
    }).present();
  }

  public errorConfirm(e) {
    this.alertCtrl.create({
      title: 'Error',
      message: e,
      buttons: [{ text: 'Ok' }]
    }).present();
  }

  async registerUser(){
    try{
      await this.afAuth.auth.createUserWithEmailAndPassword(this.user.usr, this.user.pass);
      this.user.usr = this.user.usr.split("@")[0];
      this.noteService.register(this.user);
      this.presentConfirm();
    }

    catch(e){ this.errorConfirm(e); }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
}