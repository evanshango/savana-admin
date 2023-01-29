import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupRoutingModule} from './group-routing.module'
import {ReactiveFormsModule} from "@angular/forms";
import {GroupListComponent} from "./group-list/group-list.component";
import {GroupFormComponent} from "./group-form/group-form.component";
import {GroupDetailComponent} from "./group-detail/group-detail.component";
import {SharedModule} from "../../../../shared/shared.module";
import {MemberModule} from "../member/member.module";

@NgModule({
  declarations: [
    GroupListComponent, GroupFormComponent, GroupDetailComponent
  ],
  imports: [
    CommonModule, GroupRoutingModule, SharedModule, ReactiveFormsModule, MemberModule
  ],
  exports: [
    GroupFormComponent
  ]
})
export class GroupModule {
}
