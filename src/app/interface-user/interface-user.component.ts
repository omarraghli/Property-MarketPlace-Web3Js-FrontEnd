import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataServiceService } from '../Services/data-service.service';
import { JwtClientService } from '../Services/jwt-client.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditeProfileComponent } from '../edite-profile/edite-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EventEmitterService } from '../Services/event-emitter.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-interface-user',
  templateUrl: './interface-user.component.html',
  styleUrls: ['./interface-user.component.css'],
})
export class InterfaceUserComponent implements OnInit {
  AccountForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    cin: new FormControl(''),
    address: new FormControl(''),
  });

  storedData: any;
  Account: any = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private service: JwtClientService,
    private _DataServiceService: DataServiceService,
    private dialogeRef: MatDialog,
    private dialog: MatDialogModule
  ) {}

  openDialog() {
    this.dialogeRef.open(EditeProfileComponent);
  }

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar =
        this.eventEmitterService.invokeFirstComponentFunction.subscribe(
          (name: string) => {
            this.ngOnInit();
          }
        );
    }

    const params = new HttpParams().append('id', localStorage.getItem('User'));

    let resp = this.service.GetUserInfo(localStorage.getItem('Token'), params);
    resp.subscribe((data) => {
      this.Account = data;

      console.log(this.Account);
    });
  }

  public updateData() {
    const params = new HttpParams().append('id', localStorage.getItem('User'));

    let resp = this.service.GetUserInfo(localStorage.getItem('Token'), params);
    resp.subscribe((data) => {
      this.Account = data;

      console.log(this.Account);
    });
    this.ngOnInit();
  }
}
