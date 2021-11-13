import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private apiService: ServiceService,
              private router: Router) { }

    addUser: FormGroup;
    submitted = false;

  ngOnInit(): void {
    this.addUser = this.formBuilder.group({
      id: [],
      UserName: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Email: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required]
    });
  }
  get f() { return this.addUser.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.addUser.value);

    if (this.addUser.invalid) {
      return;
  }
    this.apiService.addUser(this.addUser.value)
    .subscribe( data => {
      this.router.navigate(['/login']);
      alert('SUCCESS!! :-)')
    });
}
}
