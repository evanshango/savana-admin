import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import {SharedModule} from "../../shared/shared.module";
import { GroupFormComponent } from './group-form/group-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { GroupDetailComponent } from './group-detail/group-detail.component';
import {MemberModule} from "../member/member.module";


@NgModule({
  declarations: [
    GroupComponent,
    GroupFormComponent,
    GroupDetailComponent
  ],
    imports: [
        CommonModule,
        GroupRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        MemberModule
    ]
})
export class GroupModule { }
