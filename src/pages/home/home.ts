import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
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
  user = { usr: '', pass: '' };
  
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public noteService: note, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {}

  public errorConfirm(tit, msg) {
    this.alertCtrl.create({
      title: tit,
      message: msg,
      buttons: [{ text: 'Ok' }]
    }).present();
  }

  public gotoRegister() {
    this.navCtrl.push(RegisterPage);
  }

  async log() {
    if(this.user.usr=='' || this.user.pass==''){
      this.errorConfirm('The user not found', 'Please write email or passwor');
    } else{
      try{
        this.toastCtrl.create({ 
          message: 'Loggin...', 
          duration: 2000,
          position: 'top'
         }).present();
        await this.afAuth.auth.signInWithEmailAndPassword(this.user.usr, this.user.pass);
        this.user.usr = this.user.usr.split("@")[0];
        this.navCtrl.setRoot(UserPage , { user: this.user.usr });
      } catch(e){ this.errorConfirm('Error', e); }
    }
  }
}