import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  user: any;


  constructor(private formBuilder: FormBuilder,
              private apiService: ServiceService,
              private routes: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const routeParams = this.routes.snapshot.params;
    console.log(routeParams.id);
    this.apiService.getCommentById(routeParams.id).subscribe((data: any) => {
      this.router.navigate(['/blog/' + routeParams.id]);
      this.user = data;
     // console.log(this.users);
   });
  }

}
