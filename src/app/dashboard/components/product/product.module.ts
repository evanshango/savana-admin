import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductListComponent} from './product-list/product-list.component';
import {SharedModule} from "../../../shared/shared.module";
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductFormComponent} from './product-form/product-form.component';
import {ProductImageComponent} from './product-image/product-image.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductFormComponent,
    ProductImageComponent
  ],
  imports: [
    CommonModule, ProductRoutingModule, SharedModule, ReactiveFormsModule, FormsModule, QuillModule.forRoot()
  ],
  providers: []
})
export class ProductModule {
}
