import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Useredit } from '../Model/upload';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  userida$;
  user: any;
  selectFile: File = null;
  imageUrl : string ;
  userid: number;
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
              private routes: ActivatedRoute,
              private http: HttpClient) { }


addStory: FormGroup;
//data: any;
  ngOnInit() {
    const routeParams = this.routes.snapshot.params;
    // console.log(routeParams.id);
    this.userida$ = parseInt(routeParams.id);
    this.addStory = this.formBuilder.group({
      Id: [],
      Title: ['', Validators.required],
      Story: ['', Validators.required],
      ImageFile: [],
      ImageName: [],
      UserId: []
  });
    this.apiService.getBlogById(routeParams.id).subscribe((data: any) => {
      //  console.log(data);
      this.user = data;
      this.addStory.patchValue({
        Id: data.id,
        Title: data.title,
        Story: data.story,
        ImageName: data.imageName,
        ImageSrc: data.imageSrc,
        UserId: data.userId
      });
    });

  }
  onUpdate(){
    if(this.selectFile){
    const formData = new FormData();
    formData.append('ImageFile', this.selectFile, this.selectFile.name);
    formData.append('Title', this.addStory.get('Title').value);
    formData.append('Story', this.addStory.get('Story').value);
    formData.append('Id', this.addStory.get('Id').value);
    formData.append('ImageName', this.addStory.get('ImageName').value);
    this.http.put<any>('https://localhost:5001/api/blogs1/' + this.userida$ , formData).subscribe(
      res  => {
      this.router.navigate(['/stories']);
      }
  );
    }

else {
  this.apiService.updateBlog(this.addStory.value)
  .subscribe( data => {
    this.router.navigate(['/stories']);
  });
}
}
}
