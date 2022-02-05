import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public isSignIn(){
    return localStorage.getItem('SignIn')
    
  }

  public Logout(){
    localStorage.removeItem('Token');
    localStorage.setItem('SignIn',"false");


  }
}
