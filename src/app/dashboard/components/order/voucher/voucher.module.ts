import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VoucherRoutingModule} from './voucher-routing.module'
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import {VoucherListComponent} from "./voucher-list/voucher-list.component";
import {VoucherFormComponent} from "./voucher-form/voucher-form.component";

@NgModule({
  declarations: [
    VoucherListComponent, VoucherFormComponent
  ],
  imports: [
    CommonModule, VoucherRoutingModule, SharedModule, ReactiveFormsModule
  ]
})
export class VoucherModule {
}
