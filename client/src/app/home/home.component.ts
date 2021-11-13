import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Model/profile';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  constructor( private apiService: ServiceService,
               private router : Router,
               private routes : ActivatedRoute) { }

  ngOnInit(): void {
    this.apiService.getUserProfile().subscribe( (data: any) => {
      if(data.image != null)
      {
        localStorage.setItem('imageStatus', '1');
      };
      });
    this.apiService.getBlog()
    .subscribe( (data: any) => {
          
        this.users = data;
      //  console.log(this.users);
    });

  }
  getBlogById(user: User): void {
    this.router.navigate(['blog/' + user.id]);
  }
}
