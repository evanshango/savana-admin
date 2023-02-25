import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../../../../shared/dialog/dialog.service";
import {IVoucher} from "../../../../../shared/interfaces/voucher";
import {VoucherParams} from "../../../../../shared/models/voucher-params";
import {VoucherService} from "../voucher.service";
import {PaginationResponse} from "../../../../../shared/models/pagination-response";

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.scss']
})
export class VoucherListComponent implements OnInit {
  voucherPrams = new VoucherParams()
  pagedList: PaginationResponse<IVoucher[]>
  itemToUpdate: IVoucher
  dialogTitle: string
  voucherToDelete: string
  voucherToActivate: string
  loading: boolean
  actionArea: boolean

  constructor(public dialogService: DialogService, private voucherService: VoucherService) {
  }

  ngOnInit(): void {
    this._fetchVouchers()
  }

  onStatusChange(value: boolean) {
    this.voucherPrams.enabled = value
    this._fetchVouchers()
  }

  private _fetchVouchers() {
    this.voucherService.getVouchers(this.voucherPrams).subscribe(res => this.pagedList = res)
  }

  onPageChange(page: any) {
    this.voucherPrams.page = page
    this._fetchVouchers()
  }

  reloadVouchers() {
    this.voucherPrams = new VoucherParams()
    this._fetchVouchers()
  }

  openDialog(voucher: IVoucher) {
    this.itemToUpdate = voucher
    this.actionArea = false
    this.dialogTitle = this.itemToUpdate ? 'Edit Voucher' : 'Add Voucher'
    this.dialogService.showDialog = true
  }

  closeDialog($event: boolean) {
    this.dialogService.showDialog = $event
    this.voucherToActivate = this.voucherToDelete = null
    this.loading = false
  }

  deleteVoucher(voucher: string) {
    this.voucherToDelete = voucher
    this.actionArea = true
    this.dialogTitle = 'Delete Voucher'
    this.dialogService.showDialog = true
  }

  confirmAction() {
    this.loading = true
    if (this.voucherToDelete) {
      this._deleteVoucher()
      return
    }

    if (this.voucherToActivate) {
      this._activateVoucher()
      return;
    }
  }

  activateVoucher(voucher: IVoucher) {
    this.voucherToActivate = voucher.voucher
    this.actionArea = true
    this.dialogTitle = 'Activate Voucher'
    this.dialogService.showDialog = true
  }

  private _deleteVoucher() {
    this.voucherService.deleteVoucher(this.voucherToDelete).subscribe(() => this._performReload())
  }

  private _performReload() {
    setTimeout(() => {
      this.voucherToDelete = this.voucherToActivate = null
      this.dialogService.showDialog = false
      this.loading = false
      this.reloadVouchers()
    }, 1000)
  }

  private _activateVoucher() {
    this.voucherService.activateVoucher(this.voucherToActivate).subscribe({
      next: res => {
        if (res) {
          this._performReload()
        }
      }
    })
  }

  search(searchTerm: string) {
    this.voucherPrams.voucher = searchTerm.length > 3 ? searchTerm : ''
    this._fetchVouchers()
  }

  fetchItemsPerPage(pageSize: number) {
    this.voucherPrams.pageSize = pageSize
    this._fetchVouchers()
  }
}
