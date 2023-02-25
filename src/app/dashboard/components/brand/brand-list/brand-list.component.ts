import {Component, OnInit} from '@angular/core';
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {IBrand} from "../../../../shared/interfaces/brand";
import {BrandParams} from "../../../../shared/models/brand-params";
import {BrandService} from "../brand.service";
import {DialogService} from "../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-brand',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  brandParams: BrandParams = new BrandParams()
  pagedList: PaginationResponse<IBrand[]>
  actionArea: boolean
  brand: IBrand
  dialogTitle: string
  loading: boolean
  action: string

  constructor(private brandSvc: BrandService, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._fetchBrands()
  }

  onStatusChange(status: boolean): void {
    this.brandParams.enabled = status
    this._fetchBrands()
  }

  search(brandName: string) {
    this.brandParams.name = brandName
    this._fetchBrands()
  }

  fetchItemsPerPage(pageSize: number) {
    this.brandParams.pageSize = pageSize
    this._fetchBrands()
  }

  onPageChange(page: number) {
    this.brandParams.page = page
    this._fetchBrands()
  }

  closeDialog($event: boolean) {
    this.dialogService.showDialog = $event
    this.loading = false
  }

  openDialog(brand: IBrand, action: string) {
    this.action = action
    this.brand = brand
    this.actionArea = false
    this.dialogTitle = this.brand ? 'Edit Brand' : 'Add Brand'
    this.dialogService.showDialog = true
  }

  activateBrand(brand: IBrand, action: string) {
    this.action = action
    this.brand = brand
    this.actionArea = true
    this.dialogTitle = 'Activate Brand'
    this.dialogService.showDialog = true
  }

  deleteBrand(brand: IBrand, action: string) {
    this.action = action
    this.brand = brand
    this.actionArea = true
    this.dialogTitle = 'Delete Brand'
    this.dialogService.showDialog = true
  }

  confirmAction() {
    this.loading = true
   this.action === 'delete' ? this._deleteBrand() : this._activateBrand()
  }

  reloadBrands() {
    this.brandParams = new BrandParams()
    this._fetchBrands()
  }

  private _fetchBrands(): void {
    this.brandSvc.getBrands(this.brandParams).subscribe({
      next: res => this.pagedList = res
    })
  }

  private _deleteBrand() {
    this.brandSvc.deleteBrand(this.brand.slug).subscribe({next: () => this._performReload()})
  }

  private _activateBrand() {
    this.brand.active = true
    this.brandSvc.updateBrand(this.brand, this.brand.slug).subscribe({next: () => this._performReload()}
    )
  }

  private _performReload() {
    setTimeout(() => {
      this.loading = false
      this.brand = null
      this.dialogService.showDialog = false
      this.reloadBrands()
    }, 1000)
  }
}
