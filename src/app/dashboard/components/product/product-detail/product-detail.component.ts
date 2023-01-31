import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../../../shared/interfaces/product";
import {getTabIndex, setTabIndex} from "../../../../shared/common";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: IProduct
  activatedTabIndex: number
  tabs: string[] = ['General', 'Images']
  constructor() {
  }
  ngOnInit(): void {
    this.activatedTabIndex = getTabIndex('products')
  }

  onTabChange(tabIndex: number) {
    this.activatedTabIndex = tabIndex
    setTabIndex(this.activatedTabIndex, 'products')
  }
}
