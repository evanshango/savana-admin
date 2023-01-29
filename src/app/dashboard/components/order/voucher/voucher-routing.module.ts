import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VoucherListComponent} from "./voucher-list/voucher-list.component";

const routes: Routes = [
  {path: 'vouchers', component: VoucherListComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherRoutingModule { }
