import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
