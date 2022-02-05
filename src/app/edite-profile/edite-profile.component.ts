import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataServiceService } from '../Services/data-service.service';
import { JwtClientService } from '../Services/jwt-client.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

import { MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventEmitterService } from '../Services/event-emitter.service';  

@Component({
  selector: 'app-edite-profile',
  templateUrl: './edite-profile.component.html',
  styleUrls: ['./edite-profile.component.css']
})
export class EditeProfileComponent implements OnInit {

 
username:any
password:any
  
  AccountForm = new FormGroup({
    id:new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    cin: new FormControl(''),
    address: new FormControl(''),
    password:new FormControl('')
  });
  IdAuthenticated: any;
  Account: any = [];
  constructor(private http: HttpClient,private router: Router,private eventEmitterService: EventEmitterService,
    private service: JwtClientService,private _DataServiceService: DataServiceService
    ,private dialogeRef:MatDialogModule,private form :FormsModule ,public dialogRef: MatDialogRef<EditeProfileComponent>) { }
    

  ngOnInit(): void {
    const params = new HttpParams().append('id',  localStorage.getItem('User'));

    let resp =this.service.GetUserInfo(localStorage.getItem('Token'),params)

    resp.subscribe(data => {   
     this.Account=data 
      console.log(this.Account);
      this.password = this.Account.password  
      this.username=this.Account.username 
      console.log(this.password);
    })
  }


  updateUser(data:any)
  {

    this.AccountForm.patchValue({
        id:   localStorage.getItem('User'),
        username :this.username ,
        password : this.password 
    });

    console.warn(this.AccountForm.value)
    let resp= this.service.SaveUpdatedUser(localStorage.getItem('Token'),this.AccountForm.value)
  
      localStorage.setItem("AccountInfo",this.AccountForm.value)
      resp.subscribe((result) => {
      console.warn('result', result);
      this.dialogRef.close(); 
     
      this.eventEmitterService.onFirstComponentButtonClick();
    });
    

    
  }
  

}