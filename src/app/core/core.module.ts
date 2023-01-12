import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "../dashboard/dashboard-routing.module";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  imports: [
    CommonModule, DashboardRoutingModule, FontAwesomeModule
  ],
  exports: [HeaderComponent, SidebarComponent]
})
export class CoreModule { }
