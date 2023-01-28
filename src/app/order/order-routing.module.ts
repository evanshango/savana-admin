import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DeliveryMethodComponent} from "./delivery-method/delivery-method.component";
import {VoucherComponent} from "./voucher/voucher.component";

const routes: Routes = [
  {path: 'vouchers', component: VoucherComponent},
  {path: 'delivery-methods', component: DeliveryMethodComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
