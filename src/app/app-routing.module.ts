import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordCountComponent } from './word-count/word-count.component';
import { BlogsComponent } from './blogs/blogs.component';


const routes: Routes = [
  {
    path: 'word-count',
    component: WordCountComponent
  },
  {
    path: 'blogs',
    component: BlogsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
