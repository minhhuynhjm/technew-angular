import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { PostAddComponent } from './post-add/post-add.component';
import { PostTableComponent } from './post-table/post-table.component';
import { PostPagingComponent } from './post-paging/post-paging.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent,
    data: { title: 'List of Posts' }
  },
  { path: '',
    redirectTo: '/posts',
    pathMatch: 'full'
  },
  {
    path: 'post-detail/:id',
    component: PostDetailComponent,
    data: { title: 'Post Details' }
  },
  {
    path:'post-add',
    component:PostAddComponent,
    data:{title: 'Post Add'}
  },
  {
    path: 'post-category/:id',
    component: PostTableComponent,
    data: { title: 'Post category' }
  },
  {
    path: 'post-paging/:id',
    component: PostPagingComponent,
    data: { title: 'Post category' }
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
