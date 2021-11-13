import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  imageUrl: string ="/assets/img/user.png";
  selectFile: File = null;
  Image$: string;
  handleFileInput(event){
    this.selectFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event:any) => {

      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.selectFile);

  }
  constructor(private formBuilder: FormBuilder,
    private apiService: ServiceService,
    private router: Router,
    private http: HttpClient) { }
    LoginStatus$: Observable<boolean>;
  ngOnInit(): void {
    this.LoginStatus$ = this.apiService.isLoggesIn;
    localStorage.getItem('token');
    this.apiService.getUserProfile()
    .subscribe( (data: any) => {
      this.user = data;
      console.log(this.user);
      this.Image$ = this.user.image;
    });
  }

onSubmit() {
  const formData = new FormData();
  formData.append('ImageFile', this.selectFile, this.selectFile.name);
  this.router.navigate(['/profile']);
  this.http.put<any>('https://localhost:5001/api/UserProfile', formData).subscribe(
  res  => console.log(res)
  );
}
}