import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Users } from '../users';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
declare var QB: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  usersList : any = [];
  selectedUser: any;
  notificationObj :any;
  public endpoints:any;
  public _config:any;
  public user: any;
  constructor(
    private router: Router,
    private route : ActivatedRoute ,
    public userService: UsersService
  ) { 
    this.user = userService.user;
    this.user.token = route.snapshot.params['token'];
    this.endpoints = userService._endpoints;
    this._config = userService.config;
  }
  receiveMessage = (userId,msg) => {debugger;
    this.notificationObj = {
      from : userId,
      body: msg.body
    }
    this.userService._notification.emit(this.notificationObj);
    console.log(msg);
  }
  ngOnInit() { ;

    let token = this.route.snapshot.params.token;
    let id = this.route.snapshot.params.id;
    let params = {
      userId  : id,
      password : this.user.pass
    };
    
    console.log(this.route.snapshot);
    this.userService.getUsers(token, id)
        .subscribe((data:any) => {
          console.log(data);
          this.usersList = data.items;
          QB.init(this._config.appId, this._config.authKey, this._config.authSecret, this.endpoints );
          QB.chat.connect(params, (err, roster) => {
            if (err) { ;
              console.log(err);
          } else { ;
            QB.chat.onMessageListener = this.receiveMessage;
          }
          });
        });
    this.userService.selectedUser
        .subscribe((user: any) => {
          this.selectedUser = user;
        });
  }

}
