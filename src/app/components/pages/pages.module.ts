import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FizzBuzzModule } from './fizzbuzz/fizzbuzz.module';
import { ModulesModule } from '../modules/modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FizzBuzzModule,
    ModulesModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ]
})
export class PagesModule { }
