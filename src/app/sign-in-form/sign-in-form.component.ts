import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../Services/data-service.service';
import { JwtClientService } from '../Services/jwt-client.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
})
export class SignInFormComponent implements OnInit {
  token: any;
  sucess: any;
  response: any;
  message: any;
  tabIndex: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private service: JwtClientService,
    private _DataServiceService: DataServiceService
  ) {}

  ngOnInit(): void {}

  getValues(val: any) {
    console.warn(val);
  }

  SendValues(data: any) {
    this.http
      .post('http://localhost:9191/connexion/subs', data)
      .subscribe((result) => {
        console.warn('result', result);
      });
    this.tabIndex = 0;
  }

  async SendValuesForAuth(data: any) {
    this.getAcessToken(data);
    let resp = this.http.post('http://localhost:9191/connexion/getId', data, {
      responseType: 'Text' as 'json',
    });
    resp.subscribe((res) => console.log('USERID', res));

    resp.subscribe((res) => this.stockData(res));
  }

  // public stockData(data: any) {
  //   this._DataServiceService.addidAuthenticated(data);
  //   this.service.giveAcess();
  // }
  public stockData(data: any) {
    localStorage.setItem('User', data);
    this._DataServiceService.addidAuthenticated(data);
    this.service.giveAcess();
  }
  public getAcessToken(authRequest: any) {
    let resp = this.service.generateToken(authRequest);
    resp.subscribe((data) => console.log(data));
    resp.subscribe((data) => this.stockToken(data));
    resp.subscribe((data) => this.AcessApi(data));
  }

  // public stockToken(token: any) {
  //   this.token = token;
  //   console.warn(this.token);
  //   if (this.token != 'Erreur authentication') {
  //     this.router.navigate(['/InterfaceUser']);
  //     this.service.giveAcess();
  //     localStorage.setItem('SignIn', 'true');
  //     this.service.setToken(token);
  //   } else {
  //     console.warn('no');
  //     this.message = 'username or password inccorect';
  //   }
  // }
  public stockToken(token: any) {
    localStorage.setItem('Token', token);
    this.token = token;
    console.warn(this.token);
    if (this.token != 'Erreur authentication') {
      this.router.navigate(['/InterfaceUser']);
      this.service.giveAcess();
      localStorage.setItem('SignIn', 'true');

      this.service.setToken(token);
    } else {
      console.warn('no');
      this.message = 'username or password inccorect';
    }
  }

  public AcessApi(token: any) {
    let resp = this.service.welcome(token);
    resp.subscribe((data) => (this.response = data));
  }
}
