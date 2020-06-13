import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {leaveModel } from 'src/app/model/Leave';
import { type } from 'os';
import {Name } from 'src/app/model/Name';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.page.html',
  styleUrls: ['./leave.page.scss'],
})



export class LeavePage implements OnInit {

  isValidFormSubmitted = false;
  name: Name[]=[
    {id:1, name:'sarooj'},
    {id:2, name:'meharu'},
    {id:3, name:'ajith'},
    {id:4, name:'jose'}
  ];

  model:leaveModel={
    name:"",
    type:"",
    leaveDate:"",
    
     
  }
  

  user: Object;
  constructor(private http: HttpClient , private router: Router) { }

  ngOnInit() {
  }
  sendFeedback():void{

    console.log("COnsole test for leave Model"+this.model.type+this.model.leaveDate+"NAme of user ="+this.model.name);
    
    let Url:string = "http://localhost:8080/api/leaves";
   
    this.http.post(Url,this.model).subscribe(data => {
      alert("Leave Updated successfully");

    },
    err => {
      alert("Leave Updation failed"+console.error() );
    });
   this.router.navigateByUrl('/menu/home');
  }
}
