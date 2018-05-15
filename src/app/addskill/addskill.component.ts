import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router';
import * as firebase from 'firebase/app'




@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {

  // name :string = 'islam'
  // phone :string = '07718532723'
  // skill:string = 'IT'
  // province:string = 'baghdad'
  // price: string = '2000'
  // comments:string = 'please your comments here'

  data ={
    name :  '',
    phone :  '',
    skill:  '',
    province: '',
    price:  '',
    comments: ''
  }
 
email:string='';
uid:any;



itemList:AngularFireList<any>

  constructor(public db:AngularFireDatabase,private fire:AngularFireAuth , public route:Router) {

this.itemList =db.list('skills')
let user= localStorage.getItem('email')
this.email = user
console.log(user)

this.uid = localStorage.getItem('uid')
console.log('uid :'+this.uid)



   }

  ngOnInit() {
  

//   this.fire.authState.subscribe(auth=>{
//     if(auth){
// this.uid=auth.uid
// console.log('uid :  '+ this.uid)
//     }
//   })

  }

  insertSkill(){
    this.itemList.push({
      name : this.data.name,
    phone : this.data.phone,
    skill:  this.data.skill,
    province: this.data.province,
    price:  this.data.price,
    comments: this.data.comments,
    email:this.email,
    uid:this.uid
    })

    this.route.navigate(['/myskill'])
  }

}
