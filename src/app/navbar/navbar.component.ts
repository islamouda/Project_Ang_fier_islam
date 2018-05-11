import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


user: Observable<firebase.user>;
private isLoggedIn: Boolean= false;
private email:string;
usre




  constructor(public afAuth: AngularFireAuth) {

this.user =afAuth.authState;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});




   }

  ngOnInit() {
  }

} 
