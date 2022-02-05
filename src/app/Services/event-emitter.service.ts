import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription'; 


@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription;    
    
 
  constructor( ) { }

   
  onFirstComponentButtonClick() {    
    this.invokeFirstComponentFunction.emit();    
  }  

}