import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { note } from "../../Services/notes";
import { RegisterPage } from "../register/register";
import { UserPage } from '../user/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  user = { usr: null, pass: null };
  
  constructor(public alertCtrl: AlertController, public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public noteService: note, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {}

  public errorConfirm(e) {
    this.alertCtrl.create({
      title: 'Error',
      message: e,
      buttons: [{ text: 'Ok' }]
    }).present();
  }

  public gotoRegister() {
    this.navCtrl.push(RegisterPage);
  }

  async log() {
    try{
      await this.afAuth.auth.signInWithEmailAndPassword(this.user.usr, this.user.pass);
      this.user.usr = this.user.usr.split("@")[0];
      this.navCtrl.setRoot(UserPage , { user: this.user.usr });
    }
    catch(e){ this.errorConfirm(e); }
  }
}