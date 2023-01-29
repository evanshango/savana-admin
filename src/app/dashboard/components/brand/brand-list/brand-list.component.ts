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
  showActionArea: boolean
  selectedBrand: IBrand
  resetStatus: boolean
  dialogTitle: string
  action: string

  constructor(private brandService: BrandService, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._fetchBrands()
  }

  onStatusChange(status: boolean): void {
    this.brandParams.enabled = status
    this._fetchBrands()
  }

  performSearch(brandName: string) {
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
  }

  openDialog(brand: IBrand, action: string) {
    this.action = action
    this.selectedBrand = brand
    this.showActionArea = false
    this.dialogTitle = this.selectedBrand ? 'Edit Brand' : 'Add Brand'
    this.dialogService.showDialog = true
  }

  activateBrand(brand: IBrand, action: string) {
    this.action = action
    this.selectedBrand = brand
    this.showActionArea = true
    this.dialogTitle = 'Activate Brand'
    this.dialogService.showDialog = true
  }

  deleteBrand(brand: IBrand, action: string) {
    this.action = action
    this.selectedBrand = brand
    this.showActionArea = true
    this.dialogTitle = 'Delete Brand'
    this.dialogService.showDialog = true
  }

  confirmAction() {
    if (this.action === 'delete') {
      this._deleteBrand()
      return
    }

    if (this.action === 'activate') {
      this._activateBrand()
      return;
    }
  }

  reloadBrands() {
    this.brandParams = new BrandParams()
    this._fetchBrands()
  }

  private _fetchBrands(): void {
    this.brandService.getBrands(this.brandParams).subscribe({
      next: res => this.pagedList = res
    })
  }

  private _deleteBrand() {
    this.brandService.deleteBrand(this.selectedBrand.slug).subscribe({next: () => this._performReload()})
  }

  private _activateBrand() {
    this.selectedBrand.active = true
    this.brandService.updateBrand(this.selectedBrand, this.selectedBrand.slug).subscribe(
      {
        next: () => {
          this.resetStatus = true
          this._performReload()
        }
      }
    )
  }

  private _performReload() {
    setTimeout(() => {
      this.selectedBrand = null
      this.dialogService.showDialog = false
      this.reloadBrands()
    }, 1000)
  }
}
