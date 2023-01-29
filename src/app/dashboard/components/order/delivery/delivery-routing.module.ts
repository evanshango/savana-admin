import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeliveryListComponent} from "./delivery-list/delivery-list.component";

const routes: Routes = [
  {path: 'delivery-methods', component: DeliveryListComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
