import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module'
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home-list/home.component";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule, HomeRoutingModule, SharedModule, ReactiveFormsModule
  ]
})
export class HomeModule { }
