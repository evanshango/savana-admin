import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MemberRoutingModule} from './member-routing.module';
import {MemberComponent} from './member.component';
import {SharedModule} from "../../shared/shared.module";
import {MemberDetailComponent} from './member-detail/member-detail.component';
import { MemberFormComponent } from './member-form/member-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MemberGroupComponent } from './member-group/member-group.component';


@NgModule({
  declarations: [
    MemberComponent,
    MemberDetailComponent,
    MemberFormComponent,
    MemberGroupComponent
  ],
  exports: [
    MemberComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class MemberModule {
}
