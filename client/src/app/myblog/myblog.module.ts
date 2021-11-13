import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyblogComponent } from './myblog.component';
import { EditBlogComponent } from '../edit-blog/edit-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyblogRoutingModule } from './myblog-routing.module';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { ServiceService } from '../services/service.service';



@NgModule({
  declarations: [
    MyblogComponent,
    EditBlogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MyblogRoutingModule
  ],
  exports: [MyblogComponent],
  providers: [ServiceService, {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, AuthGuard],
})

export class MyblogModule {
  constructor (){
    console.log('Stories Constructor Module loaded')
  }
 }
