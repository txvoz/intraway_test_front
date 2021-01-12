import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesModule } from './modules/modules.module';
import { PagesModule } from './pages/pages.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModulesModule,
    PagesModule
  ]
})
export class ComponentsModule { }
