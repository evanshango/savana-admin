import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CoreModule} from "../core/core.module";
import {HomeComponent} from "./components/home/home.component";
import {DashboardComponent} from "./dashboard.component";

@NgModule({
  declarations: [
    DashboardComponent, HomeComponent
  ],
  imports: [
    CommonModule, CoreModule, DashboardRoutingModule
  ]
})
export class DashboardModule {
}
