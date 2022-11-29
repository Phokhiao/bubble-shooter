import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public router: Router,
  ) { }

  public canActivate(): boolean {
    var profile = localStorage.getItem("profile");
   
    if(profile){
     
        this.router.navigate(['home']);
        return false;
    }
      
      // return true;
    this.router.navigate(["login"]);
    
  }

}
