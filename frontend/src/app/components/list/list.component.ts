import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { User } from '../../user.module';
import { UserService } from '../../user.service';


const ELEMENT_DATA: User[] = [];

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  
  displayedColumns: string[] = ['username', 'name', 'email', 'actions'];
  dataSource: any;


  constructor(private userService: UserService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router) { 

  }

  ngOnInit() {
      this.refresh();
  }

  refresh() {
    this.userService
      .getUsers().subscribe((res: User[]) => {
        this.dataSource = res;
    });
  }

  editUser(id) {
    this.router.navigate([`/profile/${id}`]);
    this.refresh();
  }
    
  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(() => {
      this.refresh();
    });
  }



}

// export class ListComponent implements OnInit {
  
//   dataSource: MatTableDataSource<User>;
//   users: User[] = [];
//   displayedColums: string[] = ['username', 'name', 'email', 'actions'];

//   constructor(private userService: UserService,
//     private router: Router) { }

//   ngOnInit() {
//     this.fetchUsers();
//   }

//   fetchUsers() {
//     this.userService
//       .getUsers()
//       .subscribe((data: User[]) => {
//         this.users = data;
//         console.log('Data requested ... ');
//         this.dataSource = new MatTableDataSource(this.users);
//       });
//   }

//  

// }


