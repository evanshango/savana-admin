import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: '', component: HomeComponent, pathMatch: 'prefix'},
      {path: '', loadChildren: () => import('./components/order/delivery/delivery.module').then(m => m.DeliveryModule)},
      {path: '', loadChildren: () => import('./components/order/voucher/voucher.module').then(m => m.VoucherModule)},
      {path: '', loadChildren: () => import('./components/management/role/role.module').then(m => m.RoleModule)},
      {path: '', loadChildren: () => import('./components/management/group/group.module').then(m => m.GroupModule)},
      {path: '', loadChildren: () => import('./components/management/member/member.module').then(m => m.MemberModule)},
      {path: '', loadChildren: () => import('./components/brand/brand.module').then(m => m.BrandModule)},
      {path: '', loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule)},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
