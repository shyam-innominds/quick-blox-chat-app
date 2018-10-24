import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {UsersService} from '../users.service';
declare var QB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public endpoints:any;
  public _config:any;
  public user : any;

  constructor(
    private router: Router,
    public userService: UsersService

  ) { 
    this._config = userService.config;
    this.user = userService.user;
  }

  ngOnInit() {
    this.endpoints = this.userService._endpoints;
  }

  login(form: NgForm) {
    const value = form.value;
    console.log('Username', value.username, 'Password', value.password);
    QB.init(this._config.appId, this._config.authKey, this._config.authSecret, this.endpoints );
    QB.createSession({login: value.username, password: value.password}, (err, res) => {
      if(res){
        if(res.user_id){
          sessionStorage.setItem('sessionDetails',JSON.stringify(res));
          sessionStorage.setItem('loginDetails',JSON.stringify(value));
          this.user.login = value.username;
          this.user.password = value.password;
          this.user.token = res.token;
          this.router.navigate(['main',this.user.token, res.user_id ]);
        }        
      }
    });
  }
  
}
