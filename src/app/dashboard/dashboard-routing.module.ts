import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {AuthGuard} from "../core/guards/auth.guard";

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
      {path: 'dashboard', loadChildren: () => import('./../components/home/home.module').then(m => m.HomeModule)},
      {path: '', loadChildren: () => import('./../components/voucher/voucher.module').then(m => m.VoucherModule)},
      {
        path: '', loadChildren: () => import('./../components/delivery-method/delivery-method.module')
          .then(m => m.DeliveryMethodModule)
      },
      {path: '', loadChildren: () => import('./../components/role/role.module').then(m => m.RoleModule)},
      {path: '', loadChildren: () => import('./../components/group/group.module').then(m => m.GroupModule)},
      {path: '', loadChildren: () => import('./../components/member/member.module').then(m => m.MemberModule)},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
