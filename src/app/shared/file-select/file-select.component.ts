import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {options} from "../common";
import {DialogService} from "../dialog/dialog.service";
import {ProductService} from "../../dashboard/components/product/product.service";
import {IProduct} from "../interfaces/product";

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FileSelectComponent implements OnInit {
  @Output() reloadPage = new EventEmitter<any>()
  @Input() productId: string
  previews: Map<string, string> = new Map<string, string>()
  options: string[] = options
  selectedFiles: File[] = []
  selectedFile: File = null
  loading: boolean
  type: string = ''
  preview: string

  constructor(public dialogSvc: DialogService, private prodSvc: ProductService) {
  }

  ngOnInit() {

  }

  onChange(fileList: FileList, type: string) {
    if (type === 'Display') this._singleFile(fileList[0])
    else this._multipleFiles(Array.from(fileList))
  }

  confirmAction() {
    this.loading = true
    let formData = new FormData()
    if (this.type === 'Display') {
      formData.append('display', this.selectedFile)
      this.prodSvc.addProductImages(this.productId, formData).subscribe({next: res => this._resetPage(res)})
    } else {
      this.selectedFiles.forEach(file => formData.append('showCase', file))
      this.prodSvc.addProductImages(this.productId, formData).subscribe({next: res => this._resetPage(res)})
    }
  }

  closeDialog($event: boolean) {
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

  private _singleFile(file: File) {
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => this.preview = e.target.result
    fileReader.readAsDataURL(file)
    this.selectedFile = file
  }

  private _multipleFiles(files: File[]) {
    for (let i = 0; i < files.length; i++) {
      if (!this.previews.has(files[i].name)) {
        const reader = new FileReader()
        reader.onload = (e: any) => this.previews.set(files[i].name, e.target.result)
        reader.readAsDataURL(files[i])
        this.selectedFiles.push(files[i])
      }
    }
  }

  private _resetSelection() {
    this.preview = null
    this.selectedFile = null
    this.selectedFiles = []
    this.previews.clear()
    this.loading = false
  }

  private _resetPage(res: IProduct) {
    setTimeout(() => {
      this._resetSelection()
      this.dialogSvc.showDialog = false
      this.reloadPage.emit(res)
    }, 1000)
  }
}
