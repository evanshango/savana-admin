import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule, CoreModule, DashboardRoutingModule
  ]
})
export class DashboardModule {
}
