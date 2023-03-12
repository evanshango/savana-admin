import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPromotion} from "../../../../shared/interfaces/promotion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../product/product.service";
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {IProduct} from "../../../../shared/interfaces/product";
import {ProductParams} from "../../../../shared/models/product-params";
import {ISelected} from "../../../../shared/common";
import {PromotionService} from "../promotion.service";
import {DialogService} from "../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss']
})
export class PromotionFormComponent implements OnInit {
  @Output() reloadPromos = new EventEmitter<any>()
  @Input() promo: IPromotion
  @Input() action: string
  productParams: ProductParams = new ProductParams()
  productPagedList: PaginationResponse<IProduct[]>
  typeOptions = [{name: 'Days', value: 'days'}, {name: 'Hours', value: 'hours'}]
  selectedProduct: ISelected
  isSubmitting = false
  promoForm: FormGroup

  constructor(
    private fb: FormBuilder, private prodSvc: ProductService, private promoSvc: PromotionService,
    private dialogSvc: DialogService
  ) {
  }

  ngOnInit(): void {
    this._createPromoForm()
    this._fetchProducts()
    /*
    Set timeout of 500ms to ensure the fetchProducts method has been invoked
    and returned a response before patching formControl values
     */
    setTimeout(() => this._patchPromoForm(), 200)
  }

  get promoFormGroup() {
    return this.promoForm.controls
  }

  get expiresAfterFG() {
    return this.promoFormGroup['expiresAfter']
  }

  onSubmit() {
    this.isSubmitting = true
    this.action === 'edit' ? this._updatePromo() : this._addPromo()
  }

  selected($event: { type: string; id: string; name: string; tag?: string; multiple: boolean }) {
    if (!$event.multiple) {
      this._updateProduct({id: $event.id, name: $event.name})
    }
  }

  performSearch($event: { type: string; term: string }) {
    if ($event.type === 'product') {
      this.productParams.searchTerm = $event.term
      this._fetchProducts()
    }
  }

  private _createPromoForm() {
    this.promoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      discount: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      productId: ['', Validators.required],
      expiresAfter: this.fb.group({
        type: ['', [Validators.required]],
        value: [null, [Validators.required, Validators.min(1)]]
      })
    })
  }

  private _fetchProducts() {
    this.prodSvc.getProducts(this.productParams).subscribe({next: res => this.productPagedList = res})
  }

  private _updateProduct(product: { name: string; id: string }) {
    this.selectedProduct = {id: product.id, name: product.name}
    this.promoForm.patchValue({productId: this.selectedProduct.id})
    this.promoForm.markAsDirty()
  }

  private _addPromo() {
    this.promoSvc.addPromotion(this.promoForm.value).subscribe({next: res => this._quitDialog(res)})
  }

  private _updatePromo() {
    this.promoSvc.updatePromo(this.promoForm.value, this.promo.id).subscribe({next: res => this._quitDialog(res)})
  }

  private _quitDialog(res: IPromotion) {
    if (res != null) {
      setTimeout(() => {
        this.isSubmitting = false
        this.dialogSvc.showDialog = false
        this.reloadPromos.emit()
      }, 2000)
    } else {
      this.promoForm.reset()
      this.isSubmitting = false
      this.dialogSvc.showDialog = false
    }
  }

  private _patchPromoForm() {
    if (this.promo) {
      this.promoForm.patchValue(this.promo)
      /*
      Find product from productPagedList items matching returned brand name from the product response
      and update the selected brand value for display
       */
      let product = this.productPagedList?.items.find(b => b.name === this.promo.product)
      this.selectedProduct = {id: product?.id, name: product?.name}
      this.promoForm.patchValue({productId: this.selectedProduct.id})
    }
  }
}
