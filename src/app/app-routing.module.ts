import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogComponent } from './components/blog/blog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path:'blogs/:id', component: BlogComponent },
  { path:'blogs', component: BlogListComponent },
  { path:'',  redirectTo: '/blogs', pathMatch: 'full' },
  { path:'users/:id', component: UserDetailsComponent  },
  { path:'users', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
