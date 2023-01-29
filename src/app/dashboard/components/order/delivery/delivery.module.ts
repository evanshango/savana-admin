import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryRoutingModule} from './delivery-routing.module'
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import {DeliveryListComponent} from "./delivery-list/delivery-list.component";
import {DeliveryFormComponent} from "./delivery-form/delivery-form.component";

@NgModule({
  declarations: [
    DeliveryListComponent, DeliveryFormComponent
  ],
  imports: [
    CommonModule, DeliveryRoutingModule, SharedModule, ReactiveFormsModule
  ]
})
export class DeliveryModule {
}
