import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailComponent } from './blog-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from '../comment/comment.component';
import { BlogDetailRoutingModule } from './blog-detail-routing.module';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    BlogDetailComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BlogDetailRoutingModule,
  ],
  exports: [BlogDetailComponent],
})
export class BlogDetailModule { 
  constructor (){
    console.log('Blog Constructor Module loaded')
  }
}
