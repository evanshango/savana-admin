import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {SharedModule} from "../../../shared/shared.module";
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductFormComponent} from './product-form/product-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent
  ],
    imports: [
        CommonModule, ProductRoutingModule, SharedModule, ReactiveFormsModule, FormsModule, QuillModule.forRoot(), FontAwesomeModule
    ],
  providers: []
})
export class ProductModule {
}
