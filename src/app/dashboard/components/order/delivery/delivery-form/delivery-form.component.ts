import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDeliveryMethod} from "../../../../../shared/interfaces/delivery-method";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeliveryService} from "../delivery.service";
import {DialogService} from "../../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnInit {
  @Output() reloadMethods = new EventEmitter<any>()
  @Input() method: IDeliveryMethod
  @Input() action: string
  methodForm: FormGroup
  isSubmitting: boolean

  constructor(
    private fb: FormBuilder, private deliveryService: DeliveryService, private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this._createMethodForm()
    if (this.method) {
      this.methodForm.patchValue(this.method)
    }
  }

  onSubmit() {
    this.isSubmitting = true
    if (this.method) {
      this._updateMethod()
    } else {
      this._addMethod()
    }
  }

  get formDirty() {
    return this.methodForm.dirty
  }

  private _createMethodForm() {
    this.methodForm = this.fb.group({
      title: ['', Validators.required],
      deliveryTime: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    })
  }

  private _updateMethod() {
    this.deliveryService.updateDeliveryMethod(this.methodForm.value, this.method.id).subscribe(res => {
      if (res != null) {
        this._dismissDialog()
      }
    })
  }

  private _addMethod() {
    this.deliveryService.addDeliveryMethod(this.methodForm.value).subscribe(res => {
      if (res != null) {
        this._dismissDialog()
      }
    })
  }

  private _dismissDialog(): void {
    setTimeout(() => {
      this.isSubmitting = false
      this.dialogService.showDialog = false
      this.reloadMethods.emit()
    }, 2000)
  }
}
