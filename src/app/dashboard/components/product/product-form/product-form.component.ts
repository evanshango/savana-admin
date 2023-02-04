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
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";

interface ICat {
  id: string
  name: string
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: IProduct
  productForm: FormGroup;
  caret = faCaretDown
  showBrands: boolean
  showCategory: boolean
  selectedBrand: string = ''
  selectedBrandId: string
  selectedCategories: ICat[] = []
  selectedCategoryIds: string[] = []
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

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private brandService: BrandService) {
  }


  ngOnInit(): void {
    this._createProductForm()
    this._fetchCategories()
    this._fetchBrands()
  }

  onSubmit() {
    let product = this.productForm.value
    product.brand = this.selectedBrandId
    product.categories = this.selectedCategoryIds

    console.log(this.productForm.value)
  }

  get detail() {
    return this.productForm.get('detail')
  }

  get brand() {
    return this.productForm.get('brand')
  }

  itemSelected(item: { type: string, id: string, name: string }) {
    if (item.type === 'brand') {
      this.selectedBrand = item.name ? item.name : ''
      this.selectedBrandId = item.id ? item.id : ''
      this.productForm.patchValue({brand: this.selectedBrand})
      this.showBrands = false
    } else if (item.type === 'category') {
      this._updateCategories({id: item.id, name: item.name})
      this.showCategory = false
    }
  }

  pageSelected($event: { type: string; page: number }) {
    if ($event.type === 'brand') {
      this.brandParams.page = $event.page
      this._fetchBrands()
      return
    }
    if ($event.type === 'category') {
      this.categoryParams.page = $event.page
      this._fetchCategories()
      return;
    }
  }

  showOptions(action: string) {
    this.showBrands = action === 'brand' && !this.showBrands
    this.showCategory = action === 'category' && !this.showCategory
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
    this.categoryService.getCategories(this.categoryParams).subscribe({
      next: res => this.categoryPagedList = res
    })
  }

  private _fetchBrands() {
    this.brandService.getBrands(this.brandParams).subscribe({
      next: res => this.brandPagedList = res
    })
  }

  private _updateCategories(item: { id: string, name: string }) {
    if (!this.selectedCategories.find(c => c.name === item.name)) {
      this.selectedCategories.push({id: item.id, name: item.name})
      this.selectedCategoryIds.push(item.id)
      this.productForm.patchValue({categories: this.selectedCategories})
    }
  }

  remove(cat: { id: string; name: string }) {
    let existingIndex = this.selectedCategories.findIndex(c => c.id === cat.id)
    if (existingIndex > -1) {
      this.selectedCategories.splice(existingIndex, 1)
      this.selectedCategoryIds.splice(existingIndex, 1)
    }
    this.productForm.patchValue({categories: this.selectedCategories})
  }
}
