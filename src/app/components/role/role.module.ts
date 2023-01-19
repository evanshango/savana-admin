import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import {SharedModule} from "../../shared/shared.module";
import { RoleFormComponent } from './role-form/role-form.component';
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    RoleComponent,
    RoleFormComponent
  ],
    imports: [
        CommonModule,
        RoleRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class RoleModule { }
