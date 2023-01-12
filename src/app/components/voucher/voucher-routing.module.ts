import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {VoucherComponent} from "./voucher.component";

const routes: Routes = [
  {path: 'vouchers', component: VoucherComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherRoutingModule { }
