import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import {RoleComponent} from "./role/role.component";
import {RoleFormComponent} from "./role/role-form/role-form.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {GroupComponent} from "./group/group.component";
import {GroupFormComponent} from "./group/group-form/group-form.component";
import {GroupDetailComponent} from "./group/group-detail/group-detail.component";
import {MemberComponent} from "./member/member.component";
import {MemberDetailComponent} from "./member/member-detail/member-detail.component";
import {MemberFormComponent} from "./member/member-form/member-form.component";
import {MemberGroupComponent} from "./member/member-group/member-group.component";
@NgModule({
  declarations: [
    RoleComponent, RoleFormComponent, GroupComponent, GroupFormComponent, GroupDetailComponent, MemberComponent,
    MemberDetailComponent, MemberFormComponent, MemberGroupComponent
  ],
  exports: [
    GroupFormComponent, MemberComponent
  ],
  imports: [
    CommonModule, SharedModule, ManagementRoutingModule, ReactiveFormsModule
  ]
})
export class ManagementModule { }
