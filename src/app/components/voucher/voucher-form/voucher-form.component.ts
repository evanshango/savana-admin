import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VoucherService} from "../voucher.service";
import {IVoucherResponse} from "../../../shared/interfaces/voucher-response";
import {DialogService} from "../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.scss']
})
export class VoucherFormComponent implements OnInit {
  @Output() reloadVouchers = new EventEmitter<any>()
  @Input() voucher: IVoucherResponse
  @Input() voucherToDelete: string
  @Input() voucherToActivate: string
  typeOptions = [{name: 'Days', value: 'days'}, {name: 'Hours', value: 'hours'}]
  voucherForm: FormGroup;
  isSubmitting = false

  constructor(private voucherService: VoucherService, private fb: FormBuilder, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._createVoucherForm()
    if (this.voucher) {
      this.voucherForm.addControl('voucher', new FormControl(''))
      this.voucherForm.patchValue(this.voucher)
    }
  }

  onSubmit() {
    this.isSubmitting = true
    if (this.voucher) {
      this._updateVoucher()
    } else {
      this._addVoucher()
    }
  }

  private _addVoucher(): void {
    this.voucherService.addVoucher(this.voucherForm.value).subscribe(res => {
      if (res != null) {
        this._dismissDialog()
      }
    })
  }

  private _updateVoucher(): void {
    this.voucherForm.removeControl('voucher')
    this.voucherService.updateVoucher(this.voucherForm.value, this.voucher.voucher).subscribe(res => {
      if (res != null) {
        this._dismissDialog()
      }
    })
  }

  private _dismissDialog(): void {
    setTimeout(() => {
      this.isSubmitting = false
      this.dialogService.showDialog = false
      this.reloadVouchers.emit()
    }, 2000)
  }

  get voucherFormGroup() {
    return this.voucherForm.controls
  }

  get expiresAfterFG() {
    return this.voucherFormGroup['expiresAfter']
  }

  get formDirty() {
    return this.voucherForm.dirty;
  }

  private _createVoucherForm(): void {
    this.voucherForm = this.fb.group({
      title: ['', Validators.required],
      discount: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      maxUse: [null, [Validators.required, Validators.min(1)]],
      expiresAfter: this.fb.group({
        type: ['', [Validators.required]],
        value: [null, [Validators.required, Validators.min(1)]]
      })
    })
  }
}
