import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserComponent } from 'src/app/models/user/user.component';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  imports: [FormsModule];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService
  ) {}

  @Input()
  userList = new Array<UserComponent>();
  userForm: FormGroup;
  usrId: string;
  usrMail: String;
  usrName: String;
  user = new UserComponent();

  ngOnInit(): void {
    this.user.id = null;
    this.user.userMail = '';
    this.user.userName = '';

    this.userForm = new FormGroup({
      id: new FormControl(this.user.id),
      userMail: new FormControl(this.user.userMail),
      userName: new FormControl(this.user.userName),
      users: new FormControl(this.userList),
    });

    this.userService.getAll().subscribe(
      (totalResponse) => {
        this.userList = totalResponse;
      },
      (error) => {
        console.error(error);
        alert('Error: ' + error.error.message);
      }
    );
  }

  get userName() {
    return this.userForm.get('userName');
  }

  get getId() {
    return this.userForm.get('userId');
  }

  borrar(id: number) {
    this.userService.delete(id).subscribe(
      () => {
        location.reload();
        alert('Baja Exitosa!');
      },
      (error) => {
        console.error(error);
        if (error.status === 500) {
          alert('Error: ');
        }
      }
    );
  }

  addUser() {
    let user = new UserComponent();
    user.userMail = this.userForm.get('userMail').value;
    user.userName = this.userName.value;

    this.userService.add(user).subscribe(
      () => {
        this.userForm.get('userMail').setValue('');
        this.userName.setValue('');
        alert('Alta Exitosa!');
        document.getElementsByTagName('input')[0].focus();
      },
      (error) => {
        console.error(error);
        alert('Error: ' + error.error.message);
        document.getElementsByTagName('input')[0].focus();
      }
    );
  }
}
