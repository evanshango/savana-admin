import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../../../shared/interfaces/product";
import {setTabIndex} from "../../../../shared/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  tabs: string[] = ['General', 'Orders']
  index: number
  productId: string
  product: IProduct

  constructor(private activatedRoute: ActivatedRoute, private prodSvc: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')
    let tab = this.activatedRoute.snapshot.queryParamMap.get('tab')

    if (this.productId) this._fetchProduct()
    this.index = tab ? (+tab > this.tabs.length || +tab < 0 ? 0 : +tab) : 0
    // this.index = tab ? (+tab > this.tabs.length || +tab < 0 ? 0 : +tab) : getTabIndex('products')
  }

  onTabChange(tabIndex: number) {
    this.index = tabIndex
    setTabIndex(this.index, 'products')
    this.router.navigate([`/products/${this.productId}`], {queryParams: {tab: this.index}}).then()
  }

  private _fetchProduct() {
    this.prodSvc.getProduct(this.productId).subscribe({next: res => this.product = res})
  }

  reloadProduct($event: IProduct) {
    this.productId = $event.id
    this._fetchProduct()
  }
}
