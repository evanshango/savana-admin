import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeliveryMethodRoutingModule} from './delivery-method-routing.module';
import {DeliveryMethodComponent} from "./delivery-method.component";
import {SharedModule} from "../../shared/shared.module";
import { DeliveryMethodFormComponent } from './delivery-method-form/delivery-method-form.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    DeliveryMethodComponent,
    DeliveryMethodFormComponent
  ],
    imports: [
        CommonModule,
        DeliveryMethodRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class DeliveryMethodModule {
}
