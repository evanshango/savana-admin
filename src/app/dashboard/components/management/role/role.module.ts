import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleListComponent} from "./role-list/role-list.component";
import {RoleFormComponent} from "./role-form/role-form.component";
import {SharedModule} from "../../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RoleRoutingModule} from "./role-routing.module";

@NgModule({
  declarations: [
    RoleListComponent, RoleFormComponent
  ],
  imports: [
    CommonModule, SharedModule, RoleRoutingModule, ReactiveFormsModule
  ]
})
export class RoleModule {
}
