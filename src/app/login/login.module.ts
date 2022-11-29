import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import {provideStorage,getStorage} from '@angular/fire/storage';
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {firebaseConfig} from '../../environments/firebase.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
