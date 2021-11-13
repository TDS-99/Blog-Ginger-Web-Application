import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':id', component: BlogDetailComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BlogDetailRoutingModule { }
