import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBlogComponent } from '../edit-blog/edit-blog.component';
import { MyblogComponent } from './myblog.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {path: '', component: MyblogComponent},
  {path: ':id', component: EditBlogComponent,canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MyblogRoutingModule { }
