import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../shared/dialog/dialog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IVoucherResponse} from "../../shared/interfaces/voucher-response";
import {VoucherParams} from "../../shared/models/voucher-params";
import {VoucherService} from "./voucher.service";
import {PaginationResponse} from "../../shared/models/pagination-response";

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  voucherPrams = new VoucherParams()
  pagedList: PaginationResponse<IVoucherResponse[]>
  voucherForm: FormGroup;
  typeOptions = [{name: 'Days', value: 'days'}, {name: 'Hours', value: 'hours'}]
  isSubmitting = false

  constructor(public dialogService: DialogService, private fb: FormBuilder, private voucherService: VoucherService) {
  }

  ngOnInit(): void {
    this._fetchVouchers()
    this._createVoucherForm()
  }

  onStatusChange(value: boolean) {
    this.voucherPrams.enabled = value
    this._fetchVouchers()
  }

  onSubmit() {
    this.isSubmitting = true
    this.voucherService.addVoucher(this.voucherForm.value).subscribe()
    setTimeout(() => {
      this.closeDialog(false)
      this.voucherPrams = new VoucherParams()
      this._fetchVouchers()
      this.isSubmitting = false
    }, 2500)
  }

  get voucherFormGroup() {
    return this.voucherForm.controls
  }

  get expiresAfterFG() {
    return this.voucherFormGroup['expiresAfter']
  }

  get formTouched() {
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

  closeDialog(event: boolean) {
    this.voucherForm.reset()
    this.dialogService.showDialog = event
  }

  private _fetchVouchers() {
    this.voucherService.getVouchers(this.voucherPrams).subscribe(res => this.pagedList = res)
  }

  onPageChange($event: any) {

  }
}
