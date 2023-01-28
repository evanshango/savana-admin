import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: '', component: HomeComponent, pathMatch: 'prefix'},
      {path: '', loadChildren: () => import('../order/order.module').then(m => m.OrderModule)},
      {path: '', loadChildren: () => import('../management/management.module').then(m => m.ManagementModule)},
      {path: '', loadChildren: () => import('../brand/brand.module').then(m => m.BrandModule)}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
