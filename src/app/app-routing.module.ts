import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FizzBuzzListComponent } from './components/pages/fizzbuzz/fizzbuzz-list/fizzbuzz-list.component';

const routes: Routes = [
  {
    path: '',
    component: FizzBuzzListComponent
  },
  {
    path: 'fizzbuzz',
    component: FizzBuzzListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
