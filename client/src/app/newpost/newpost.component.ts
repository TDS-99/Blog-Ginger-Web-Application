import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  selectFile: File = null;
  imageUrl : string;
  cheack : boolean;
  Image$: string;
  handleFileInput(event){
    this.selectFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event:any) => {

      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.selectFile);
    this.cheack = true;
  }
  constructor(private formBuilder: FormBuilder,
              private apiService: ServiceService,
              private router: Router,
              private http: HttpClient) { }
  addStory: FormGroup;

  ngOnInit(): void {
  
    this.addStory = this.formBuilder.group({
      Id: [],
      Title: ['', Validators.required],
      Story: ['', Validators.required],
      ImageFile: []

    });
  }
 
  onSubmit() {
    if(this.cheack == true){
    const formData = new FormData();
    formData.append('ImageFile', this.selectFile, this.selectFile.name);
    formData.append('Title', this.addStory.get('Title').value);
    formData.append('Story', this.addStory.get('Story').value);
    this.router.navigate(['/stories']);
    this.http.post<any>('https://localhost:5001/api/blogs1', formData).subscribe(
    res  => console.log(res)
    );
    }
    else{
      this.apiService.createBlog(this.addStory.value)
      .subscribe( data => {
        this.router.navigate(['/stories']);
      });
    }
  }
}

