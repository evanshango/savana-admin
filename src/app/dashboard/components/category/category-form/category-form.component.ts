import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICategory} from "../../../../shared/interfaces/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {icons} from "../../../../shared/common";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {CategoryService} from "../category.service";
import {DialogService} from "../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Output() reloadCategories = new EventEmitter<any>()
  @Input() action: string
  @Input() category: ICategory
  isSubmitting: boolean
  showOptions: boolean = true
  selectedIcon: string = ''
  categoryForm: FormGroup
  icons: IconDefinition[] = icons()
  filteredIcons: IconDefinition[] = []

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._createCategoryForm()
    if (this.category) {
      this.categoryForm.patchValue(this.category)
      this.iconChange(this.category.icon)
    }
  }

  onSubmit() {
    this.isSubmitting = true
    if (this.action === 'add') {
      this._createCategory()
      return
    }

    if (this.action === 'edit') {
      this._updateCategory()
    }
  }

  iconChange(target: string): void {
    this.showOptions = true
    let filtered = this.icons.filter(value => value.iconName.includes(target))
    this.filteredIcons = filtered.length > 0 ? filtered : this.icons
  }

  iconTypes(): IconDefinition[] {
    return this.filteredIcons.length > 0 ? this.filteredIcons : this.icons
  }

  setIcon(iconName: string) {
    this.showOptions = false
    this.selectedIcon = iconName
    this.categoryForm.patchValue({icon: this.selectedIcon})
  }

  private _createCategoryForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#c1c1c1', Validators.required]
    })
  }

  private _createCategory() {
    this.categoryService.addCategory(this.categoryForm.value).subscribe({next: res => this._dismissDialog(res)})
  }

  private _updateCategory() {
    this.categoryService.updateCategory(this.categoryForm.value, this.category.slug!).subscribe({
      next: res => this._dismissDialog(res)
    })
  }

  private _dismissDialog(res: ICategory) {
    if (res != null) {
      setTimeout(() => {
        this.isSubmitting = false
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
