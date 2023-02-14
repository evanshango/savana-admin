import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct} from "../../../../shared/interfaces/product";
import {ProductService} from "../product.service";
import {DialogService} from "../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {
  @Output() reloadProduct = new EventEmitter<IProduct>()
  @Input() product: IProduct
  selectedFiles: File[] = []
  selectedFile: File = null
  preview: string | ArrayBuffer
  previews: Map<string, string> = new Map<string, string>()
  dialogTitle: string = ''
  loading: boolean
  tagType: string = ''
  imgURL: string = ''
  action: string = ''
  images: any = []

  constructor(private prodSvc: ProductService, public dialogSvc: DialogService) {
  }

  ngOnInit(): void {
    if (this.product.displayImage) this.images.push({key: 'display', value: this.product.displayImage})
    if (this.product.showCaseImages.length > 0) {
      this.product.showCaseImages.forEach(img => this.images.push({key: 'showCase', value: img}))
    }
  }

  updateImage(value: string, input: HTMLInputElement) {
    this.dialogTitle = 'Update Image'
    this.imgURL = value
    input.multiple = false
    setTimeout(() => input.click(), 200)
  }

  onChange(files: FileList) {
    this.tagType === 'addMulti' ? this._multiFiles(Array.from(files)) : this._singleFile(files[0])
    this.dialogSvc.showDialog = true
  }

  confirmAction() {
    this.loading = true
    this.action === 'add' ? this._addMedia() : this._updateMedia()
  }

  closeDialog($event: boolean) {
    this.imgURL = ''
    this.action = ''
    this.tagType = ''
    this.preview = null
    this.loading = false
    this.previews.clear()
    this.selectedFile = null
    this.selectedFiles = []
    this.dialogSvc.showDialog = $event
  }

  getPreviews(previews: Map<string, string>): string[] {
    return [...previews.values()]
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

  private _singleFile(file: File) {
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (e: any) => this.preview = e.target.result
      fileReader.readAsDataURL(file)
      this.selectedFile = file
    }
  }

  private _multiFiles(pickedFiles: File[]) {
    for (let i = 0; i < pickedFiles.length; i++) {
      if (!this.previews.has(pickedFiles[i].name)) {
        const reader = new FileReader()
        reader.onload = (e: any) => this.previews.set(pickedFiles[i].name, e.target.result)
        reader.readAsDataURL(pickedFiles[i])
        this.selectedFiles.push(pickedFiles[i])
      }
    }
  }

  private _addMedia() {
    let formData = new FormData()
    if (this.tagType === 'addSingle' && this.selectedFile) formData.append('display', this.selectedFile)

    if (this.tagType === 'addMulti' && this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => formData.append('showCase', file))
    }

    this.prodSvc.addProductImages(this.product.id, formData).subscribe({next: res => this._resetPage(res)})
  }

  private _updateMedia() {
    if (this.selectedFile) {
      let formData = new FormData()
      formData.append('existingUrl', this.imgURL)
      formData.append('image', this.selectedFile)
      this.prodSvc.updateProductImage(this.product.id, formData).subscribe({
        next: res => this._resetPage(res)
      })
    }
  }

  private _resetPage(res: IProduct) {
    if (res) {
      setTimeout(() => {
        this._getImages(res)
        this.closeDialog(false)
      }, 500)
    }
  }

  private _getImages(product: IProduct) {
    this.product = product
    let images = []
    if (product.displayImage) images.push({key: 'display', value: product.displayImage})
    if (product.showCaseImages.length > 0) {
      product.showCaseImages.forEach(img => images.push({key: 'showCase', value: img}))
    }
    this.images = images
  }
}
