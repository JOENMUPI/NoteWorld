import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { note } from "../Services/notes";
import { DetailPage } from '../pages/detail/detail';
import { UserPage } from '../pages/user/user';
import { RegisterPage } from '../pages/register/register';
import { NewNotePage } from '../pages/new-note/new-note';
import { EditNotePage } from '../pages/edit-note/edit-note';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBZsDS58K0FaxEHzHfldEnUUu5oOt8-hrs",
  authDomain: "movil2-881a0.firebaseapp.com",
  databaseURL: "https://movil2-881a0.firebaseio.com",
  storageBucket: "movil2-881a0.appspot.com",
  messagingSenderId: "888738070472"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    UserPage,
    RegisterPage,
    NewNotePage, 
    EditNotePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    DetailPage,
    UserPage, 
    RegisterPage,
    NewNotePage, 
    EditNotePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    note
  ]
})
export class AppModule {}
