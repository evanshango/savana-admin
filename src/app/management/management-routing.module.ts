import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleComponent} from "./role/role.component";
import {GroupComponent} from "./group/group.component";
import {GroupDetailComponent} from "./group/group-detail/group-detail.component";
import {MemberComponent} from "./member/member.component";
import {MemberDetailComponent} from "./member/member-detail/member-detail.component";

const routes: Routes = [
  {path: 'roles', component: RoleComponent},
  {path: 'groups', component: GroupComponent},
  {path: 'groups/:slug', component: GroupDetailComponent, pathMatch: 'full'},
  {path: 'users', component: MemberComponent},
  {path: 'users/:id', component: MemberDetailComponent, pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
