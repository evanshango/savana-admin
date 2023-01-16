import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VoucherRoutingModule} from "./voucher-routing.module";
import { VoucherComponent } from './voucher.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import { VoucherFormComponent } from './voucher-form/voucher-form.component';

@NgModule({
  declarations: [
    VoucherComponent,
    VoucherFormComponent
  ],
    imports: [
        CommonModule, VoucherRoutingModule, SharedModule, ReactiveFormsModule
    ]
})
export class VoucherModule { }
