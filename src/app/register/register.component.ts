import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {




  email:string='';
  password:string='';
  



  constructor(private fire:AngularFireAuth ,private route:Router) { }

  ngOnInit() {
  }
  myRegister(){
    this.fire.auth.createUserAndRetrieveDataWithEmailAndPassword(this.email,this.password).then(user =>{
      console.log(this.email,this.password)
      this.route.navigate(['home'])
    }).catch(error=>{
      console.error(error)
    })
  }
}
