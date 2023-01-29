import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupListComponent} from "./group-list/group-list.component";
import {GroupDetailComponent} from "./group-detail/group-detail.component";

const routes: Routes = [
  {path: 'groups', component: GroupListComponent},
  {path: 'groups/:slug', component: GroupDetailComponent, pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
