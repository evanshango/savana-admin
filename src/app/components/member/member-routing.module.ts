import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberComponent} from "./member.component";
import {MemberDetailComponent} from "./member-detail/member-detail.component";

const routes: Routes = [
  {path: 'users', component: MemberComponent},
  {path: 'users/:id', component: MemberDetailComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
