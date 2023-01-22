import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../role/role.service";
import {RoleParams} from "../../../shared/models/role-params";
import {IRole} from "../../../shared/interfaces/role";
import {GroupService} from "../group.service";
import {IGroup} from "../../../shared/interfaces/group";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  @Output() reloadGroups = new EventEmitter<any>()
  selectedRoles: IRole[] = []
  initialRoleLength: number = 0

  @Input() group: IGroup
  isSubmitting: boolean
  isSubmitted: boolean = false
  groupForm: FormGroup
  roles: IRole[]

  constructor(
    private fb: FormBuilder, private roleService: RoleService, private groupService: GroupService,
    private dialogService: DialogService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this._createGroupForm()
    this._fetchRoles()
    if (this.group) {
      this.groupForm.patchValue(this.group)
      this.group.roles.forEach(role => this.addRole(role))
      this._setInitialRoleLength()
    }
  }

  onSubmit() {
    this.isSubmitting = true
    if (this.group) {
      this._updateGroup()
    } else {
      this.addGroup()
    }
  }

  addRole(role: IRole) {
    if (!this.selectedRoles.find(rl => rl.id === role.id)) this.selectedRoles.push(role)
    this.groupForm.get('roleIds').patchValue([...this._getSelectedRoles(this.selectedRoles)])
  }

  removeRole(role: IRole) {
    let existingIndex = this.selectedRoles.findIndex(rl => rl.id === role.id)
    if (existingIndex > -1) this.selectedRoles.splice(existingIndex, 1)
    this.groupForm.get('roleIds').patchValue([...this._getSelectedRoles(this.selectedRoles)])
  }

  get formDirty() {
    return this.groupForm.dirty || this.groupForm.get('roleIds').value.length !== this.initialRoleLength
  }

  private _createGroupForm() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      roleIds: ['', Validators.required]
    })
  }

  private _fetchRoles() {
    let roleParams = new RoleParams()
    roleParams.paginated = false
    this.roleService.getUnPaginatedRoles(roleParams).subscribe(res => this.roles = res)
  }

  private _getSelectedRoles(selectedRoles: IRole[]): string[] {
    return selectedRoles.map(role => role.id)
  }

  private _dismissDialog(res: IGroup, action: string): void {
    if (res != null) {
      setTimeout(() => {
        if (action === 'add') {
          this.isSubmitting = false
          this.dialogService.showDialog = false
          this.groupForm.reset()
          this.reloadGroups.emit()
        } else {
          this._setInitialRoleLength()
          this.groupForm.reset(res)
          this.router.navigateByUrl('/groups').then()
        }
      }, 1500)
    }
  }

  private addGroup() {
    this.groupService.addGroup(this.groupForm.value).subscribe(res => this._dismissDialog(res, 'add'))
  }

  private _updateGroup() {
    this.groupService.updateGroup(this.groupForm.value, this.group.slug).subscribe(
      res => this._dismissDialog(res, 'update')
    )
  }

  private _setInitialRoleLength() {
    let roleIds: [] = this.groupForm.get('roleIds').value
    this.initialRoleLength = roleIds?.length
  }
}
