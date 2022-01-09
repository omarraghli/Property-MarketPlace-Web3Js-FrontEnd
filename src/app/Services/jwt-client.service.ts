import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  idAuthenticated:any

  isSignIn:any =0
  constructor(private http:HttpClient) { }

  public generateToken(request: any){
    return this.http.post("http://localhost:9191/connexion/auth",request,{responseType:'Text' as 'json'});
  }


  public welcome(token: any){
    let tokenStr='Bearer '+token
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get("http://localhost:9191/connexion/home",{headers,responseType:'Text' as 'json'})
  }


  public giveAcess(){
          this.isSignIn=1
  }

  public removeAcess(){
          this.isSignIn=0
  }

  public giveValueofAccess(){
     return this.isSignIn
  }

  
  
}
