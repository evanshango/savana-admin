import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../../../shared/interfaces/product";
import {ProductParams} from "../../../../shared/models/product-params";
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {ProductService} from "../product.service";
import {DialogService} from "../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productParams: ProductParams = new ProductParams()
  pagedList: PaginationResponse<IProduct[]>
  selectedProduct: IProduct
  resetStatus: boolean
  loading: boolean
  dialogTitle: string
  action: string

  constructor(private productService: ProductService, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._fetchProducts()
  }

  onStatusChange(status: boolean) {
    this.productParams.enabled = status
    this._fetchProducts()
  }

  search(searchTerm: string) {
    this.productParams.searchTerm = searchTerm
    this._fetchProducts()
  }

  fetchItemsPerPage(pageSize: number) {
    this.productParams.pageSize = pageSize
    this._fetchProducts()
  }

  onPageChange(page: number) {
    this.productParams.page = page
    this._fetchProducts()
  }

  activateProduct(product: IProduct, action: string) {
    this.dialogTitle = 'Activate Product'
    this.selectedProduct = product
    this.action = action
    this.dialogService.showDialog = true
  }

  deleteProduct(product: IProduct, action: string) {
    this.dialogTitle = 'Delete Product'
    this.selectedProduct = product
    this.action = action
    this.dialogService.showDialog = true
  }

  closeDialog($event: boolean) {
    this.dialogService.showDialog = $event
    this.selectedProduct = null
    this.loading = false
  }

  confirmAction() {
    this.loading = true
    if (this.action === 'delete') {
      console.log('deleting product', this.selectedProduct.name)
    }
  }

  private _fetchProducts() {
    this.productService.getProducts(this.productParams).subscribe({next: res => this.pagedList = res})
  }
}
