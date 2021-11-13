import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imageUrl = '/assets/img/user.png';
  Logo = '/assets/img/Blog-Ginger.jpg';
  token: any;
  user: any;
  constructor(private router: Router, private apiService: ServiceService) { }
  LoginStatus$: Observable<boolean>;
  ImageStatus$: Observable<boolean>;
  ngOnInit(): void {
     this.LoginStatus$ = this.apiService.isLoggesIn;
     this.ImageStatus$ = this.apiService.isImageIn;
     this.apiService.getUserProfile().subscribe( (data: any) => {
      this.user = data;
      });
  }
  logOut(){

    this.apiService.logout();
    this.router.navigate(['/login']);
}

}
