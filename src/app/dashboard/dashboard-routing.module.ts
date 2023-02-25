import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../common/guards/auth.guard";
import {ContentComponent} from "../core/content/content.component";

const routes: Routes = [
  {
    path: '', component: ContentComponent, canActivate: [AuthGuard], children: [
      {path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)},
      {path: '', loadChildren: () => import('./components/order/delivery/delivery.module').then(m => m.DeliveryModule)},
      {path: '', loadChildren: () => import('./components/order/voucher/voucher.module').then(m => m.VoucherModule)},
      {path: '', loadChildren: () => import('./components/management/role/role.module').then(m => m.RoleModule)},
      {path: '', loadChildren: () => import('./components/management/group/group.module').then(m => m.GroupModule)},
      {path: '', loadChildren: () => import('./components/management/member/member.module').then(m => m.MemberModule)},
      {path: '', loadChildren: () => import('./components/brand/brand.module').then(m => m.BrandModule)},
      {path: '', loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule)},
      {path: '', loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)},
      {path: '', loadChildren: () => import('./components/promotion/promotion.module').then(m => m.PromotionModule)}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
