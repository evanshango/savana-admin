import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "../dashboard/dashboard-routing.module";
import {NavbarComponent} from "./navbar/navbar.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, ContentComponent],
  imports: [
    CommonModule, DashboardRoutingModule, FontAwesomeModule
  ],
  exports: [NavbarComponent, SidebarComponent]
})
export class CoreModule { }
