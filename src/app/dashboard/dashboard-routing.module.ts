import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
      {path: 'dashboard', loadChildren: () => import('./../components/home/home.module').then(m => m.HomeModule)},
      {path: '', loadChildren: () => import('./../components/voucher/voucher.module').then(m => m.VoucherModule)}
    ]
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
