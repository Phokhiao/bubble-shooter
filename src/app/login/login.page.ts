import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
// import { Storage} from '@angular/fire/storage';
// import { addDoc,collection, setDoc , Timestamp , Firestore} from "@angular/fire/firestore"; 
// import { AngularFireStore } from '@angular/fire/compat/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import liff from '@line/liff';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  app:any;
  db:any;
  title = 'angular-line-login';
  idToken = '';
  displayName = '';
  pictureUrl = '';
  statusMessage = '';
  userId = '';

  constructor(public router: Router,private firestore: AngularFirestore) {
    // this.items = firestore.collection('items').valueChanges();

   }

  ngOnInit() {

    this.initLine();
    // console.log('Hello')
  }

  initLine(): void {
    liff.init({ liffId: '1657657096-2YMPoVqb' }, () => {
      if (liff.isLoggedIn()) {
        this.runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  runApp(): void {
    const idToken = liff.getIDToken();
    this.idToken = idToken;
    liff.getProfile().then(profile => {
      console.log(profile);
      this.displayName = profile.displayName;
      this.pictureUrl = profile.pictureUrl;
      this.statusMessage = profile.statusMessage;
      this.userId = profile.userId;
      localStorage.setItem('profile', profile.toString());

      this.savelog(profile)

      // this.router.navigateByUrl('home');

    }).catch(err => console.error(err));
  }

  logout(): void {
    liff.logout();
    window.location.reload();
  }
  
  async savelog(obj:any){
    const data = {
      displayName : obj.displayName,
      pictureUrl : obj.pictureUrl,
      statusMessage : obj.statusMessage,
      userId :obj.userId,
      login_time : new Date(),
    }
    const dbInstance = this.firestore.doc('login_log')
    dbInstance.set(data)
    console.log(dbInstance)
    // dbInstance.forEach((doc) => {
    //   console.log(`${doc.id} => ${doc.data()}`);
    // });
    
    // try{console.log("SAVE");
    // const dbInstance = collection(this.firestore,'login_log')
   
    // addDoc(dbInstance,data)
    // console.log("SAVE Success");}catch(err){
    //   console.log(err);
    // }
    
    // doc = obj.userId+login_time
    // await setDoc(doc(this.db, "login_log", "one"), data);
  }
  
}
