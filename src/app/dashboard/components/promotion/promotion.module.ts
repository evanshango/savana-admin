import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import {SharedModule} from "../../../shared/shared.module";
import { PromotionFormComponent } from './promotion-form/promotion-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PromotionListComponent,
    PromotionFormComponent
  ],
    imports: [
        CommonModule,
        PromotionRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class PromotionModule { }
