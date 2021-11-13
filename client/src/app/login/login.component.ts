import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: any;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ServiceService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({ 
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }
  onSubmit(){
    
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };
    this.apiService.login(loginData).subscribe((data: any) =>{

      this.message = data.message;
     // console.log(data.token);
      if(data.token) {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/blog']);
       } else {
         this.invalidLogin = true;
        // alert('a' + data.message);
       }
     });
 
     localStorage.setItem('loginStatus','1');

   }
  }