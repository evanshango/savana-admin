import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemberRoutingModule} from './member-routing.module'
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import {MemberListComponent} from "./member-list/member-list.component";
import {MemberDetailComponent} from "./member-detail/member-detail.component";
import {MemberFormComponent} from "./member-form/member-form.component";
import {MemberGroupComponent} from "./member-group/member-group.component";

@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent, MemberFormComponent, MemberGroupComponent
  ],
  imports: [
    CommonModule, MemberRoutingModule, SharedModule, ReactiveFormsModule
  ],
  exports: [
    MemberListComponent
  ]
})
export class MemberModule {
}
