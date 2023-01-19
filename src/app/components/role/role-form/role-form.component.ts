import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRole} from "../../../shared/interfaces/role";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../role.service";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {status} from "../../../shared/common";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  @Output() reloadRoles = new EventEmitter<any>()
  @Input() action: string
  @Input() role: IRole
  status = status
  roleForm: FormGroup
  isSubmitting: boolean

  constructor(private fb: FormBuilder, private roleService: RoleService, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.createRoleForm()
    if (this.role) {
      this.roleForm.addControl('uniqueName', new FormControl(''))
      this.roleForm.patchValue(this.role)
    }
  }

  onSubmit() {
    this.isSubmitting = true
    this.roleForm.patchValue({active: JSON.parse(this.roleForm.get('active').value.toString())})

    if (this.role) {
      this._updateRole()
    } else {
      this._addRole()
    }
  }

  get formDirty() {
    return this.roleForm.dirty
  }

  private createRoleForm() {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      active: [true, Validators.required]
    })
  }

  private _addRole() {
    this.roleService.addRole(this.roleForm.value).subscribe(res => this._dismissDialog(res))
  }

  private _updateRole() {
    this.roleForm.removeControl('uniqueName')
    this.roleService.updateRole(this.roleForm.value, this.role.id).subscribe(res => this._dismissDialog(res))
  }

  private _dismissDialog(res: IRole): void {
    if (res != null) {
      setTimeout(() => {
        this.isSubmitting = false
        this.dialogService.showDialog = false
        this.reloadRoles.emit()
      }, 2000)
    } else {
      this.roleForm.reset()
      this.isSubmitting = false
      this.dialogService.showDialog = false
    }
  }
}
