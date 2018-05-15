import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


email:string='';
password:string='';



  constructor(private fire:AngularFireAuth ,private route:Router) { }

  ngOnInit() {

  }
  myLogin(){
    this.fire.auth.signInAndRetrieveDataWithEmailAndPassword(this.email,this.password).then(user =>{
      console.log(this.email,this.password)
      localStorage.setItem('isLoggedIn','true')
      localStorage.setItem('email',this.fire.auth.currentUser.email)

      this.fire.authState.subscribe(auth=>{
        if(auth){
   
    localStorage.setItem('uid',auth.uid)
    
        }
      })


      this.route.navigate(['home'])
    }).catch(error=>{
      console.error(error)
    })
  }
}
