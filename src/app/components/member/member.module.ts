import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        MemberComponent
    ],
    exports: [
        MemberComponent
    ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    SharedModule
  ]
})
export class MemberModule { }
