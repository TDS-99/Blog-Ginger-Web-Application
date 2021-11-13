import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BlogDetailRoutingModule } from '../blog-detail/blog-detail-routing.module';
import { BlogDetailModule } from '../blog-detail/blog-detail.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    BlogDetailRoutingModule,
    BlogDetailModule

  ],
  exports: [HomeComponent]
})
export class HomeModule { 
  constructor(){
    console.log(' home Constructor Module loaded');
  }
}
