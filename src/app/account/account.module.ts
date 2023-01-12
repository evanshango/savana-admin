import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountRoutingModule} from "./account-routing.module";
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule, AccountRoutingModule
  ]
})
export class AccountModule {
}
