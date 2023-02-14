import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../../../shared/interfaces/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../category/category.service";
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {ICategory} from "../../../../shared/interfaces/category";
import {CategoryParams} from "../../../../shared/models/category-params";
import {BrandParams} from "../../../../shared/models/brand-params";
import {IBrand} from "../../../../shared/interfaces/brand";
import {BrandService} from "../../brand/brand.service";
import {ISelected} from "../../../../shared/common";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: IProduct
  isSubmitting: boolean
  productForm: FormGroup;
  selectedBrand: ISelected = null
  selectedCategories: ISelected[] = []
  brandParams = new BrandParams()
  categoryParams = new CategoryParams()
  brandPagedList: PaginationResponse<IBrand[]>
  categoryPagedList: PaginationResponse<ICategory[]>
  modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, false]}],
      [{'font': ['Sans Serif', 'monospace']}],
      [{'align': []}],
      ['bold', 'italic', 'underline'],
      [{'color': []}],
      [],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['image'],
    ]
  }

  constructor(
    private fb: FormBuilder, private catSvc: CategoryService, private brandSvc: BrandService,
    private prodSvc: ProductService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this._fetchCategories()
    this._fetchBrands()
    this._createProductForm()

    /*
    Set timeout of 500ms to ensure the fetchBrands and fetchCategories methods have been invoked
    and returned respective responses before patching formControl values
     */
    setTimeout(() => this._patchProductForm(), 500)
  }

  onSubmit() {
    this.isSubmitting = true
    if (this.product) this._updateProduct()
    else this._createProduct()
  }

  get detail() {
    return this.productForm.get('detail')
  }

  selected(item: { type: string, id: string, name: string, tag?: string, multiple: boolean }): void {
    switch (item.multiple) {
      case true:
        if (item.tag === 'remove') {
          this._removeCategories({id: item.id, name: item.name})
        } else {
          this._updateCategories({id: item.id, name: item.name})
        }
        this.productForm.patchValue({categories: this.selectedCategories.map(c => c.id)})
        break
      case false:
        this._updateBrand({id: item.id, name: item.name})
        break
    }
  }

  pageChange($event: { type: string; page: number }) {
    if ($event.type === 'brand') {
      this.brandParams.page = $event.page
      this._fetchBrands()
    }
    if ($event.type === 'category') {
      this.categoryParams.page = $event.page
      this._fetchCategories()
    }
  }

  private _createProductForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      stock: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      categories: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      owner: ['', Validators.required],
      detail: ['', Validators.required]
    })
  }

  private _fetchCategories() {
    this.catSvc.getCategories(this.categoryParams).subscribe({
      next: res => this.categoryPagedList = res
    })
  }

  private _fetchBrands() {
    this.brandSvc.getBrands(this.brandParams).subscribe({next: res => this.brandPagedList = res})
  }

  private _removeCategories(category: { name: string; id: string }) {
    let existingIndex = this.selectedCategories.findIndex(c => c.id === category.id)
    if (existingIndex > -1) {
      this.selectedCategories.splice(existingIndex, 1)
    }
    this.productForm.patchValue({categories: this.selectedCategories.map(c => c.id)})
    this.productForm.markAsDirty()
  }

  private _updateCategories(category: { name: string; id: string }) {
    if (!this.selectedCategories.find(i => i.id === category.id)) {
      this.selectedCategories.push({id: category.id, name: category.name})
    }
    this.productForm.patchValue({categories: this.selectedCategories.map(c => c.id)})
  }

  private _updateBrand(brand: { name: string; id: string }) {
    this.selectedBrand = {id: brand.id, name: brand.name}
    this.productForm.patchValue({brand: this.selectedBrand.id})
    this.productForm.markAsDirty()
  }

  private _createProduct() {
    this.prodSvc.addProduct(this.productForm.value).subscribe({next: res => this._onSuccess(res, 1)})
  }

  private _updateProduct() {
    console.log('updating product', this.productForm.value)
  }

  private _onSuccess(product: IProduct, tab: number): void {
    if (product) {
      this.product = product
      this.router.navigate([`/products/${product.id}`], {queryParams: {tab: tab}}).then()
    }
  }

  private _patchProductForm() {
    if (this.product) {
      this.productForm.patchValue(this.product)
      /*
      Remap product entity properties to properties matching form control names (stock, price)
       */
      this.productForm.patchValue({stock: this.product.inStock})
      this.productForm.patchValue({price: this.product.finalPrice})

      /*
      Find brand from brandPagedList items matching returned brand name from the product response
      and update the selected brand value for display
       */
      let brand = this.brandPagedList?.items.find(b => b.name === this.product.brand)
      this.selectedBrand = {id: brand?.id, name: brand?.name}
      this.productForm.patchValue({brand: this.selectedBrand.id})

      /*
      Find categories from categoryPagedList items matching returned values of respective category names
      of the product response and update the selected categories for display
       */
      this.selectedCategories = this.categoryPagedList?.items.filter(c => this.product.categories.includes(c.name))
        .map(cat => ({id: cat.id, name: cat.name}) as ISelected)
      this.productForm.patchValue({categories: this.selectedCategories.map(c => c.id)})
    }
  }
}
