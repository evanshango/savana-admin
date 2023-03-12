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
import {ISelected, options} from "../../../../shared/common";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";
import {DialogService} from "../../../../shared/dialog/dialog.service";
import {IUser} from "../../../../shared/interfaces/user";
import {MemberService} from "../../management/member/member.service";
import {UserParams} from "../../../../shared/models/user-params";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: IProduct
  type: string = ''
  images: any = []
  actionArea: boolean = false
  loading: boolean
  isSubmitting: boolean
  productForm: FormGroup;
  selectedBrand: ISelected = null
  selectedVendor: ISelected = null
  selectedCategories: ISelected[] = []
  brandParams = new BrandParams()
  categoryParams = new CategoryParams()
  userParams = new UserParams()
  brandPagedList: PaginationResponse<IBrand[]>
  categoryPagedList: PaginationResponse<ICategory[]>
  vendorPagedList: PaginationResponse<IUser[]>
  previews: Map<string, string> = new Map<string, string>()
  options: string[] = options
  selectedFiles: File[] = []
  selectedFile: File = null
  preview: string
  dialogTitle: string = 'Add Images'
  tagType: string = ''
  imgURL: string = ''
  action: string = ''
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
    private prodSvc: ProductService, private router: Router, public dialogSvc: DialogService,
    private memberSvc: MemberService
  ) {
  }

  ngOnInit(): void {
    this._fetchCategories()
    this._fetchBrands()
    this._fetchVendors()
    this._createProductForm()
    /*
    Set timeout of 500ms to ensure the fetchBrands and fetchCategories methods have been invoked
    and returned respective responses before patching formControl values
     */
    setTimeout(() => this._patchProductForm(), 500)
  }

  updateImage(value: string, input: HTMLInputElement, action: string) {
    this.action = action
    this.dialogTitle = 'Update Image'
    this.imgURL = value
    input.multiple = false
    setTimeout(() => input.click(), 200)
  }

  addFile(input: HTMLInputElement, tag: string, action: string) {
    this.tagType = tag
    this.action = action
    if (tag === 'addSingle') {
      input.multiple = false
      this.dialogTitle = 'Add Display Image'
    } else {
      input.multiple = true
      this.dialogTitle = 'Add ShowCase Images'
    }
    input.click()
  }

  onChange(fileList: FileList, type: string) {
    type === 'Display' ? this._singleFile(fileList[0]) : this._multipleFiles(Array.from(fileList))
  }

  onSubmit() {
    this.isSubmitting = true
    this.product ? this._updateProduct() : this._createProduct()
  }

  openDialog(action: string) {
    this.action = action
    this.dialogSvc.showDialog = true
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
        item.type === 'brand'
          ? this._updateBrand({id: item.id, name: item.name})
          : this._updateVendor({id: item.id, name: item.name})
        break
    }
  }

  confirmAction() {
    this.loading = true
    this.action === 'update' ? this._updateMedia() : (
      this.type === 'Display' ? this._addDisplayImage() : (
        this.type === 'ShowCase' ? this._addShowCaseImages() : this._addImages()
      )
    )
  }

  closeDialog($event: boolean) {
    this.tagType = ''
    this.type = ''
    this._resetSelection()
    this.dialogSvc.showDialog = $event
  }

  onTypeChange(type: string) {
    this.type = type
    this._resetSelection()
  }

  getPreviews(previews: Map<string, string>): string[] {
    return [...previews.values()]
  }

  performSearch($event: { type: string; term: string }) {
    if ($event.type === 'brand') {
      this.brandParams.name = $event.term
      this._fetchBrands()
    }
    if ($event.type === 'category') {
      this.categoryParams.name = $event.term
      this._fetchCategories()
    }

    if ($event.type === 'vendor') {
      this.userParams.name = $event.term
      this._fetchVendors()
    }
  }

  updateChange(files: FileList) {
    this.tagType === 'addMulti' ? this._multipleFiles(Array.from(files)) : this._singleFile(files[0])
    this.dialogSvc.showDialog = true
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
    this.catSvc.getCategories(this.categoryParams).subscribe({next: res => this.categoryPagedList = res})
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
    this.prodSvc.addProduct(this.productForm.value).subscribe({next: res => this._onSuccess(res, 0)})
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
      /*
      Map product images inform of key value pairs (display, showCase)
       */
      let {displayImage: display, showCaseImages: showCase} = this.product
      if (display) this.images.push({key: 'display', value: display})
      if (showCase) showCase.forEach(img => this.images.push({key: 'showCase', value: img}))

      // Patch product form with values returned from this.product field value
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
      this.selectedCategories = this.categoryPagedList?.items.filter(c =>
        this.product.categories.includes(c.name)
      ).map(cat => ({id: cat.id, name: cat.name}) as ISelected)
      this.productForm.patchValue({categories: this.selectedCategories.map(c => c.id)})
    }
  }

  private _singleFile(file: File) {
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => this.preview = e.target.result
    fileReader.readAsDataURL(file)
    this.selectedFile = file
    this.actionArea = true
  }

  private _multipleFiles(files: File[]) {
    for (let i = 0; i < files.length; i++) {
      if (!this.previews.has(files[i].name)) {
        const reader = new FileReader()
        reader.onload = (e: any) => this.previews.set(files[i].name, e.target.result)
        reader.readAsDataURL(files[i])
        this.selectedFiles.push(files[i])
        this.actionArea = true
      }
    }
  }

  private _resetSelection() {
    this.preview = null
    this.selectedFile = null
    this.selectedFiles = []
    this.previews.clear()
    this.loading = false
    this.actionArea = false
  }

  private _resetPage(res: IProduct) {
    setTimeout(() => {
      this.product = res
      this.tagType = ''
      this.type = ''
      this._resetSelection()
      this.dialogSvc.showDialog = false
    }, 1000)
  }

  private _updateMedia() {
    if (this.selectedFile) {
      let formData = new FormData()
      formData.append('existingUrl', this.imgURL)
      formData.append('image', this.selectedFile)
      this.prodSvc.updateProductImage(this.product.id, formData).subscribe({next: res => this._resetPage(res)})
    }
  }

  private _addDisplayImage() {
    let formData = new FormData()
    formData.append('display', this.selectedFile)
    this.prodSvc.addProductImages(this.product.id, formData).subscribe({next: res => this._resetPage(res)})
  }

  private _addShowCaseImages() {
    let formData = new FormData()
    this.selectedFiles.forEach(file => formData.append('showCase', file))
    this.prodSvc.addProductImages(this.product.id, formData).subscribe({next: res => this._resetPage(res)})
  }

  private _addImages() {
    let formData = new FormData()
    if (this.tagType === 'addSingle' && this.selectedFile) formData.append('display', this.selectedFile)
    if (this.tagType === 'addMulti' && this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => formData.append('showCase', file))
    }
    this.prodSvc.addProductImages(this.product.id, formData).subscribe({next: res => this._resetPage(res)})
  }

  private _fetchVendors() {
    this.memberSvc.getMembers(this.userParams, 'vendor').subscribe({next: res => this.vendorPagedList = res})
  }

  private _updateVendor(vendor: { name: string; id: string }) {
    this.selectedVendor = {id: vendor.id, name: vendor.name}
    this.productForm.patchValue({owner: this.selectedVendor.id})
    this.productForm.markAsDirty()
  }
}
