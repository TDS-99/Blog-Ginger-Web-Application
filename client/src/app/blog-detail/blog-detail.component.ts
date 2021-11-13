import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  user: any;
  postid: any;
  constructor(private formBuilder: FormBuilder,
              private apiService: ServiceService,
              private routes: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }
  addComment: FormGroup;
  ngOnInit(): void {
    const routeParams = this.routes.snapshot.params;
  //  console.log(routeParams.id);
    this.postid = routeParams.id;
    this.apiService.getBlogById(routeParams.id).subscribe((data: any) => {
      this.user = data;
      //console.log(this.user);
   });
    this.addComment = this.formBuilder.group({
    id: [],
    UserComment: ['', Validators.required],
    BlogId: []
  });
}

onSubmit() {
  const routeParams = this.routes.snapshot.params;
  this.addComment.patchValue({
  BlogId: parseInt(this.postid)
  });
  this.apiService.comment(this.addComment.value)
  .subscribe( ()  => {
    location.reload();
    // console.log(this.postid);
      });
  }
}
