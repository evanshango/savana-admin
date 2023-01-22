import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberComponent} from "./member.component";

const routes: Routes = [
  {path: 'users', component: MemberComponent},
  // {path: 'groups/:slug', component: GroupDetailComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
