import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../../../../shared/interfaces/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {gender, status} from "../../../../../shared/common";

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  @Output() cancelEdit = new EventEmitter<boolean>()
  @Input() isEdit: boolean
  @Input() user: IUser
  isSubmitting: boolean
  resetPassword: boolean
  userForm: FormGroup
  passwordForm: FormGroup
  gender = gender
  status = status

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._createUserForm()
    if (this.user) {
      let datePipe = new DatePipe("en-US");
      this.user.createdAt = datePipe.transform(this.user.createdAt, 'MMM d, y HH:mm')
      this.userForm.patchValue(this.user)
    }
    this._createPasswordForm()
  }

  onSubmit() {
    this.userForm.removeControl('id')
    this.userForm.removeControl('createdAt')
    this.userForm.removeControl('email')
    this.userForm.removeControl('groupCount')
    this.cancelEdit.emit(true)
  }

  get formDirty(): boolean {
    return this.userForm.dirty
  }

  private _createUserForm() {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNo: ['', Validators.required],
      groupCount: ['', Validators.required],
      gender: ['', Validators.required],
      active: [Validators.required],
      createdAt: ['', Validators.required],
    })
  }

  private _createPasswordForm() {
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }
}
