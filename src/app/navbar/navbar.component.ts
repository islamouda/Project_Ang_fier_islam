import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/observable';
import * as firebase from 'firebase/app'
import { Router} from '@angular/router';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


user: Observable<firebase.User>
private isLoggedIn: boolean= false;
private email:string;





  constructor(public afAuth:AngularFireAuth ,public route:Router ) {


      // let status = localStorage.getItem('isLoggedIn')
      // console.log(status)
      // if (status === 'true'){
      //   this.isLoggedIn =true;
      // }else{
      //   this.isLoggedIn =false;

      // }



    this.user= afAuth.authState;
    this.afAuth.authState.subscribe(auth => { 
      if(auth) {
        this.isLoggedIn= true;
        // this.route.navigate(['/home'])
      } else {
        this.isLoggedIn= false;
    this.route.navigate(['/login'])
      }});

  


   }

  ngOnInit() {
  }
  logout(){
    this.afAuth.auth.signOut();
    this.isLoggedIn=false;
    localStorage.setItem('isLoggedIn','false')
    this.route.navigate(['/login'])
  }
  
} 
