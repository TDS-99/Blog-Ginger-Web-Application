import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Model/profile';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css']
})
export class MyblogComponent implements OnInit {
  users: any;
  token: any;
  constructor( private apiService: ServiceService,
               private routes: ActivatedRoute,
               private router : Router) { }

  ngOnInit(): void {
   // this.apiService.params$ = this.routes.params;
    this.apiService.getBlogByUser()
    .subscribe( (data: any) => {
        this.users = data;
      //  console.log(this.users);
    });
  }
  getBlogById(user: User): void {
    this.router.navigate(['blog/'+ user.id]);
  }

  deleteBlog(user: User): void {
    this.apiService.deleteBlog(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      });
}

edit(user: User): void {
  this.router.navigate(['stories/'+ user.id]);
}

}

