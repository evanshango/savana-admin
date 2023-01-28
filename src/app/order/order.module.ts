import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {DeliveryMethodComponent} from "./delivery-method/delivery-method.component";
import {
  DeliveryMethodFormComponent
} from "./delivery-method/delivery-method-form/delivery-method-form.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {VoucherComponent} from "./voucher/voucher.component";
import {VoucherFormComponent} from "./voucher/voucher-form/voucher-form.component";
@NgModule({
  declarations: [
    DeliveryMethodComponent, DeliveryMethodFormComponent, VoucherComponent, VoucherFormComponent
  ],
  imports: [
    CommonModule, SharedModule, ReactiveFormsModule, OrderRoutingModule
  ]
})
export class OrderModule { }
