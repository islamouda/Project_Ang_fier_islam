import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionSequence } from 'protractor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-allskill',
  templateUrl: './allskill.component.html',
  styleUrls: ['./allskill.component.css']
})
export class AllskillComponent implements OnInit {




  itemList:AngularFireList<any>
  itemArray=[]

data ={
  name :  '',
  phone :  '',
  skill:  '',
  province: '',
  price:  '',
  comments: ''
}

  constructor(public db:AngularFireDatabase ,public route:Router ) { 
    
    this.itemList =db.list('skills')

    this.itemList.snapshotChanges().subscribe(actions=>{
    actions.forEach(action => {
      let y = action.payload.toJSON()
      y["$key"]=action.key
      this.itemArray.push(y as ListItemClass)
    
    })
     })


    //  this.rout.params.subscribe(params => console.log(params))
  }

  ngOnInit() {
  }

  
  moreInfo(key){
    
    this.route.navigate(['details/'+key])
  }

 
}

export class ListItemClass{
  $key: string;
  name :string;
    phone :string;
    skill: string;
    province: string;
    price: string;
    comments:string;
}