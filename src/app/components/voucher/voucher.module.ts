import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VoucherRoutingModule} from "./voucher-routing.module";
import { VoucherComponent } from './voucher.component';
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    VoucherComponent
  ],
    imports: [
        CommonModule, VoucherRoutingModule, SharedModule, ReactiveFormsModule
    ]
})
export class VoucherModule { }
