import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandRoutingModule } from './brand-routing.module'
import {BrandListComponent} from "./brand-list/brand-list.component";
import {SharedModule} from "../../../shared/shared.module";
import { BrandFormComponent } from './brand-form/brand-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    BrandListComponent,
    BrandFormComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BrandModule { }
