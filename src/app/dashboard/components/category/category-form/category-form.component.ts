import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICategory} from "../../../../shared/interfaces/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../category.service";
import {DialogService} from "../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Output() reloadCategories = new EventEmitter<any>()
  @Input() category: ICategory
  @Input() action: string
  isSubmitting: boolean
  categoryForm: FormGroup
  categoryFile: File
  preview: string | ArrayBuffer;

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._createCategoryForm()
    if (this.category) this.categoryForm.patchValue(this.category)
  }

  onSubmit() {
    /**
     * Create an instance of formData and add necessary properties
     * before submitting form value to backend server set isSubmitting value to true
     */
    this.isSubmitting = true
    if (this.categoryFile) {
      let formData: FormData = new FormData()
      formData.append('name', this.categoryForm.get('name').value)
      formData.append('image', this.categoryFile)
      this.action === 'add' ? this._createCategory(formData) : this._updateCategory(formData)
    }
  }

  onChange(file: File) {
    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (e: any) => this.preview = e.target.result
      fileReader.readAsDataURL(file)
      this.categoryFile = file
      this.categoryForm.markAsDirty()
      this.categoryForm.patchValue({imageUrl: file})
    }
  }

  private _createCategoryForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [null, Validators.required]
    })
  }

  private _createCategory(formData: FormData) {
    this.categoryService.addCategory(formData).subscribe({next: res => this._dismissDialog(res)})
  }

  private _updateCategory(formData: FormData) {
    if (this.category.imageUrl){
      formData.append('existingImage', this.category.imageUrl)
    }
    this.categoryService.updateCategory(
      formData, this.category.slug!
    ).subscribe({next: res => this._dismissDialog(res)})
  }

  private _dismissDialog(res: ICategory) {
    if (res != null) {
      setTimeout(() => {
        this.isSubmitting = false
        this.preview = null
        this.categoryFile = null
        this.dialogService.showDialog = false
        this.reloadCategories.emit()
      }, 2000)
    } else {
      this.categoryForm.reset()
      this.isSubmitting = false
      this.dialogService.showDialog = false
    }
  }
}
