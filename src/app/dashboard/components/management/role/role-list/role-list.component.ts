import {Component, Input, OnInit} from '@angular/core';
import {PaginationResponse} from "../../../../../shared/models/pagination-response";
import {IRole} from "../../../../../shared/interfaces/role";
import {RoleService} from "../role.service";
import {RoleParams} from "../../../../../shared/models/role-params";
import {DialogService} from "../../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-role',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  @Input() resetStatus: boolean
  roleParams: RoleParams = new RoleParams()
  pagedList: PaginationResponse<IRole[]>
  dialogTitle: string
  action: string
  showActionArea: boolean
  role: IRole

  constructor(private roleService: RoleService, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._fetchRoles()
  }

  openDialog(role: IRole) {
    this.action = 'edit'
    this.role = role
    this.showActionArea = false
    this.dialogTitle = this.role ? 'Edit Role' : 'Add Role'
    this.dialogService.showDialog = true
  }

  onStatusChange(status: boolean) {
    this.roleParams.enabled = status
    this._fetchRoles()
  }

  performSearch(roleName: string) {
    this.roleParams.name = roleName
    this._fetchRoles()
  }

  fetchItemsPerPage(pageSize: number) {
    this.roleParams.pageSize = pageSize
    this._fetchRoles()
  }

  onPageChange(page: number) {
    console.log(page)
  }

  activateRole(role: IRole) {
    this.action = 'activate'
    this.role = role
    this.showActionArea = true
    this.dialogTitle = 'Activate Role'
    this.dialogService.showDialog = true
  }

  closeDialog($event: boolean) {
    this.dialogService.showDialog = $event
    this.role = null
    this.action = ''
  }

  confirmAction($event: string) {
    if ($event === 'activate') {
      this._activateRole()
      return;
    }
  }

  reloadRoles() {
    this.resetStatus = true
    this._fetchRoles()
  }

  private _fetchRoles() {
    this.roleService.getPaginatedRoles(this.roleParams).subscribe(res => this.pagedList = res)
  }

  private _performReload() {
    setTimeout(() => {
      this.role = null
      this.dialogService.showDialog = false
      this.reloadRoles()
    }, 1000)
  }

  private _activateRole() {
    let update = {name: this.role.name, description: this.role.description, active: true}
    this.roleService.updateRole(update, this.role.id).subscribe(res => {
      if(res != null) {
        this.roleParams = new RoleParams()
        this._performReload()
      }
    })
  }
}
