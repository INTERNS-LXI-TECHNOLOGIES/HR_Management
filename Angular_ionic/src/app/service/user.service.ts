import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string ="http://localhost:8080"
  getUser(url:string) 
  {
    return  this.http.get(url);
  }
  getUserExtra(url:string)
  {
    return  this.http.get(url);
  }
  // getUserDataBean(url:string)
  // {
  //   return  this.http.get(url);
  // }
  constructor(private  http : HttpClient) { }
}
