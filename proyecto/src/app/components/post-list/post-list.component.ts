import { Component, Input, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PostComponent } from 'src/app/models/post/post.component';
import { UserComponent } from 'src/app/models/user/user.component';
import { PostServiceService } from 'src/app/services/post-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  imports: [FormsModule];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postService: PostServiceService,
    private userService: UserServiceService
  ) {}

  @Input()
  postList = new Array<PostComponent>();
  userList = new Array<UserComponent>();
  postForm: FormGroup;
  usrId: string;
  text: string;

  post = new PostComponent();

  ngOnInit(): void {
    this.post.id = null;
    this.post.text = '';
    this.post.user = null;
    this.post.userId = null;

    this.postForm = new FormGroup({
      users: new FormControl(this.userList),
      posts: new FormControl(this.postList),
      userId: new FormControl(this.userId, Validators.required),
      postId: new FormControl(this.post.id),
      text: new FormControl(this.post.text),
      user: new FormControl(this.post.user),
    });

    this.userService.getAll().subscribe((response) => {
      this.userList = response;
      if (this.userList.length > 0) {
        this.users.setValue(this.userList[0].id);
        this.userChange(this.userList[0].id);
      }
    });
    document.getElementsByTagName('select')[0].focus();
  }

  get users() {
    return this.postForm.get('users');
  }

  get userId() {
    return this.postForm.get('userId');
  }

  get textControl() {
    return this.postForm.get('text');
  }

  userChange(usrId: number) {
    this.userService.getById(usrId).subscribe((response) => {
      this.post.user = response;
    });
  }

  borrar(id: number) {
    this.postService.delete(id).subscribe(
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

  addPost() {
    let post = new PostComponent();
    post.text = this.textControl.value;
    post.userId = this.userId.value;

    this.postService.add(post).subscribe(
      () => {
        this.textControl.setValue('');
        this.userId.setValue('');
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

  updatePost(id: number) {
    let post = new PostComponent();
    post.id = this.post.id;
    post.text = this.post.text;
    post.user = this.post.user;
    post.userId = this.post.userId;

    this.postService.edit(post).subscribe(
      () => {
        alert('Modificación Exitosa!');
        this.router.navigateByUrl('/{id}/update');
      },
      (error) => {
        console.error(error);
        alert('Error: ' + error.error.message);
      }
    );
  }
}
