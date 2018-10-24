import { Component, OnInit, Input } from '@angular/core';

import { Users } from '../../../users';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  @Input() user: any;
  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  onSelectedUser(id) {
    document.getElementById(id).classList.remove("active");
    this.userService.selectedUser.emit(this.user);
  }

}
