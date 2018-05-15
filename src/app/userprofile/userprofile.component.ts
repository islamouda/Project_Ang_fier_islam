import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage ,AngularFireStorageReference ,AngularFireUploadTask} from 'angularfire2/storage';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

email:string;
myid:string;

itemList: AngularFireList<any>

itemArray = []

data = {
  name : '' ,
  phone :  '' ,
  comments :  '' ,
  skill :  '' ,
  province :  '' ,
  price :  '',
  email:''
 }

  constructor(public db:AngularFireDatabase) {



    this.email= localStorage.getItem('email')
    this.myid= localStorage.getItem('uid')



    this.itemList = db.list('users')

    this.itemList.snapshotChanges()
    .subscribe(actions=>{
          actions.forEach(action=>{
            let y = action.payload.toJSON()
            y["$key"] = action.key
          

            if(action.payload.child('uid').val() == this.myid){
              this.itemArray.push(y as ListItemClass)
              this.data.name =this.itemArray[0]['name']
              this.data.phone =this.itemArray[0]['phone']
              this.data.skill =this.itemArray[0]['skill']
              this.data.province =this.itemArray[0]['province']
              this.data.price =this.itemArray[0]['price']
              this.data.comments =this.itemArray[0]['comments']
              this.data.email =this.itemArray[0]['email']
    
              
    
    
              console.log(this.itemArray[0]['name'])
            }

})
    })

this.myid =  localStorage.getItem('uid')
    console.log(this.itemArray)
    

   }

  ngOnInit() {
    console.log (localStorage.getItem('uid'))

  }
  // onEdit( ){
 

  //   this.itemList.set(this.userKey , {
  //     name : this.data.name  ,
  //     phone :  this.data.phone ,
  //     age : this.data.age ,
  //     address :  this.data.address ,
  //     city :  this.data.city ,
  //     job :  this.data.job , 
  //     email:this.email,
  //     uid:this.myid
  //   })
  
 
    


  // }
}


export class ListItemClass{
  $key: string;
  name : string;
  phone :  string;
  comments :  string;
  skill :  string;
  province : string;
  price :  string;
  
}
