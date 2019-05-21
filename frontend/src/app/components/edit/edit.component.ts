import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { UserService } from '../../user.service';
import { User } from '../../user.module';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  user: any = {};
  updateForm: FormGroup;

  constructor(private userService: UserService,
    private router: Router, private route: ActivatedRoute, 
    private snackBar: MatSnackBar, private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.userService.getUserById(this.id).subscribe(res => {
        this.user = res;
        this.updateForm.get('name').setValue(this.user.name);
        this.updateForm.get('email').setValue(this.user.email);
        this.updateForm.get('username').setValue(this.user.username);
        this.updateForm.get('password').setValue(this.user.password);
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required ],
      email: '',
      username: '',
      password: ''
    });
  }

  updateUser(name, email, username, password) {
    this.userService.updateUser(this.id, name, email, username, password).subscribe(() => {
      this.snackBar.open('User updated successfully', 'OK', {
        duration: 3000,
      });
    });
  }

}
