import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router';





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
 

itemList:AngularFireList<any>

  constructor(public db:AngularFireDatabase , public route:Router) {

this.itemList =db.list('skills')

   }

  ngOnInit() {

  console.log(this.data.name)

  }

  insertSkill(){
    this.itemList.push({
      name : this.data.name,
    phone : this.data.phone,
    skill:  this.data.skill,
    province: this.data.province,
    price:  this.data.price,
    comments: this.data.comments
    })

    this.route.navigate(['/myskill'])
  }

}
