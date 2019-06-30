import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MyBlogsComponent } from './components/my-blogs/my-blogs.component';
import { ViewComponent } from './components/view/view.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '' , redirectTo: 'home' , pathMatch: 'full'},
  {path: 'home' , component: HomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'signup' , component: SignUpComponent},
  {path: 'myblogs' , component: MyBlogsComponent , canActivate: [AuthGuard]},
  {path: 'view/:postId' , component: ViewComponent},
  {path: 'edit-profile/:id' , component: EditProfileComponent},
  {path: 'profile/:id' , component: ProfileComponent},

  {path: '**' , redirectTo: 'home'},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
