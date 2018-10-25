import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';

import { Users } from './users';
import { USERS } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _session: any;
  _loginDetails : any;
  selectedUser = new EventEmitter<any>();
  loggedInUserId = new EventEmitter<any>();
  _notification = new EventEmitter<any>();
  _receivedMsg = new EventEmitter<any>();

  _endpoints =
  {
    "api_endpoint": "https://api.quickblox.com",
    "chat_endpoint": "chat.quickblox.com",
    "turnserver_endpoint": "turnserver.quickblox.com"
};
  config = {
    // appId: 74282,
    // authKey: 'ENFggvVB2trchUa',
    // authSecret: 'MQTsDR6cFLWHdOq'

    appId: 74277,
    authKey: 'aqFLpyRgAeaRMj6',
    authSecret: 'PPjY3L8UdK5h85Y'
  };

  user = {
    name: '',
    login: '',
    password: '',
    id: '',
    token : ''
  };

  constructor(
    private http: HttpClient
  ) { }
  setsession(value){
    this._session = value;
  }

  getUsers(token , id){
    return this.http.get("https://api.quickblox.com/users.json?filter[]=number+id+ne+"+id,{
      headers: {'QB-Token': token,'content-type':'application/json'}
    });
  }
  getChatDialog(url, token){
    return this.http.get(url,{
      headers: {'QB-Token': token,'content-type':'application/json'}
    })
  }
  getChatHistory(url, token){
    return this.http.get(url,{
      headers: {'QB-Token': token,'content-type':'application/json'}
    })
  }

  getsession(){
      return this._session;
  }
  setLoginDetails(obj){
    this._loginDetails = obj;
  }

  getLoginDetails(){
    return this._loginDetails;
  }

  getUsersList(): Observable<Users[]> {
    return of(USERS);
  }

  getLoggedInUserDetails(uname,token){
    return this.http.get("https://api.quickblox.com/users/by_login.json?login="+uname,{
      headers: {'QB-Token': token,'content-type':'application/json'}
    });
  }
}
