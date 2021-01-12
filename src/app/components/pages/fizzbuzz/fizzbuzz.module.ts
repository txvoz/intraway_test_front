import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FizzBuzzCreateComponent } from './fizzbuzz-create/fizzbuzz-create.component';
import { FizzBuzzListComponent } from './fizzbuzz-list/fizzbuzz-list.component';
import { ModulesModule } from '../../modules/modules.module';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertModule } from '../../modules/_alert';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    FizzBuzzCreateComponent,
    FizzBuzzListComponent
  ],
  imports: [
    CommonModule,
    ModulesModule,
    RouterModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AlertModule,
    CKEditorModule
  ]
})
export class FizzBuzzModule { }
