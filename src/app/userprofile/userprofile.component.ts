import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { AngularFireStorage ,AngularFireStorageReference ,AngularFireUploadTask} from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  email:string;
  myid:string;
  itemList: AngularFireList<any>;

itemArray = []

data = {
  name : '' ,
  phone :  '' ,
  comments :  '' ,
  skill :  '' ,
  province :  '' ,
  price :  '',
  image:''
 }
 
   userKey:any

   ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  downloadURL :Observable<string>;
  imageURL:string

  constructor(private afStorage: AngularFireStorage ,public db:AngularFireDatabase ) { 
    this.email = localStorage.getItem('email')
    this.myid = localStorage.getItem('uid')


    this.itemList = db.list('skills')

    this.itemList.snapshotChanges()
    .subscribe(actions=>{
          actions.forEach(action=>{
            let y = action.payload.toJSON()
            y["$key"] = action.key
            this.userKey
        //   console.log(action.payload.toJSON())
        //   console.log(action.payload.child('uid').val() )

            if (action.payload.child('uid').val() == this.myid ) {
              this.userKey = action.key
              this.itemArray.push(y as ListItemClass)
             this.data.name = this.itemArray[0]['name'] ;
             this.data.phone = this.itemArray[0]['phone'] ;
             this.data.comments = this.itemArray[0]['comments'] ;
             this.data.skill = this.itemArray[0]['skill'] ;
             this.data.province = this.itemArray[0]['province'] ;
             this.data.price = this.itemArray[0]['price'] ;
             this.data.image = this.itemArray[0]['image'] 
            
     
           
          
             console.log(this.userKey)
         
              
                     }

  
})
    })
 
  












  }

  ngOnInit() {
    console.log(this.email)
    console.log(this.myid)
    
  }




  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.afStorage.upload(id, event.target.files[0]).then(()=>{
    this.ref = this.afStorage.ref(id);
    this.ref.getDownloadURL().subscribe(url =>{

        if (url) {
    this.imageURL = url
        
        }

         console.log(this.imageURL)

      this.itemList.set(this.userKey , {
        name : this.data.name ,
        phone :  this.data.phone ,
        comments : this.data.comments ,
        skill :  this.data.skill ,
        province :  this.data.province ,
        price :  this.data.price,
        uid :  this.myid,
        image: this.imageURL
      })

    })

    })

    // this.ref = this.afStorage.ref(id);
    // this.task = this.ref.put(event.target.files[0]);
    // this.downloadURL =  this.task.downloadURL();
    // console.log(this.downloadURL)



    // this.downloadURL.subscribe(url => {

    //   if (url) {
    //    this.imageURL = url
      
    //   }
    //   console.log(this.imageURL)

    //   this.itemList.set(this.userKey , {
    //     name : this.data.name ,
    //     phone :  this.data.phone ,
    //     comments : this.data.comments ,
    //     skill :  this.data.skill ,
    //     province :  this.data.province ,
    //     price :  this.data.price,
    //     uid :  this.myid,
    //     image: this.imageURL
    //   })

    // })
    
  }

  
  


  onEdit( ){
 

    this.itemList.set(this.userKey , {
      name : this.data.name ,
      phone :  this.data.phone ,
      comments : this.data.comments ,
      skill :  this.data.skill ,
      province :  this.data.province ,
      price :  this.data.price,
      uid :  this.myid,
      
    })
  
 
    


  }
 









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

 