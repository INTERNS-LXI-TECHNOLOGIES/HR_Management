import { map } from 'rxjs/operators';
import { userViewModel } from 'src/app/model/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  editUser(model: FormData) {
    return this.http.post('http://localhost:8080/api/appraisal-controller-resource/editUser', model);
  }
  id: any;
  apiUrl:string ="http://localhost:8080"
  getUser(url:string) 
  {
    return  this.http.get<userViewModel>(url);
  }
  getStatus(url:string): Observable<any>
  {
    return  this.http.get(url);
  }
  getImage(url:string): Observable<string>
  {
    return  this.http.get<string>(url, { responseType: 'text' });
  }
  // getImage(url:string): Observable<any>
  // {
  //   return  this.http.get(url).map(rsp => this.sanitizer.bypassSecurityTrustUrl(rsp.text()));
  // }
  setId(id)
  {
    this.id = id;
  }
  getId()
  {
    return this.id;
  }

  constructor(private  http: HttpClient, private sanitizer: DomSanitizer) { }
}
