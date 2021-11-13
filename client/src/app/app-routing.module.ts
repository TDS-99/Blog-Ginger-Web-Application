import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyblogComponent } from './myblog/myblog.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { NewpostComponent } from './newpost/newpost.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'blog', loadChildren: () => import('./blog-detail/blog-detail.module').then(mod => mod.BlogDetailModule)},
  {path: 'stories', loadChildren: () => import('./myblog/myblog.module').then(mod => mod.MyblogModule)},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'newpost', component: NewpostComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
