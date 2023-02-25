import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../../../shared/dialog/dialog.service";
import {ICategory} from "../../../../shared/interfaces/category";
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {CategoryParams} from "../../../../shared/models/category-params";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  pagedList: PaginationResponse<ICategory[]>
  categoryParams: CategoryParams = new CategoryParams()
  category: ICategory
  actionArea: boolean
  dialogTitle: string
  loading: boolean
  action: string

  constructor(public dialogService: DialogService, private categorySvc: CategoryService) {
  }

  ngOnInit(): void {
    this._fetchCategories()
  }

  openDialog(category: ICategory, action: string) {
    this.loading = false
    this.category = category
    this.action = action
    this.actionArea = false
    this.dialogTitle = this.category ? 'Edit Category' : 'Add Category'
    this.dialogService.showDialog = true
  }

  onStatusChange(status: boolean) {
    this.categoryParams.enabled = status
    this._fetchCategories()
  }

  search(name: string) {
    this.categoryParams.name = name
    this._fetchCategories()
  }

  fetchItemsPerPage(pageSize: number) {
    this.categoryParams.pageSize = pageSize
    this._fetchCategories()
  }

  onPageChange(page: number) {
    this.categoryParams.page = page
    this._fetchCategories()
  }

  activateCategory(category: ICategory, action: string) {
    this.action = action
    this.category = category
    this.actionArea = true
    this.dialogTitle = 'Activate Category'
    this.dialogService.showDialog = true
  }

  deleteCategory(category: ICategory, action: string) {
    this.action = action
    this.category = category
    this.actionArea = true
    this.dialogTitle = 'Delete Category'
    this.dialogService.showDialog = true
  }

  closeDialog($event: boolean) {
    this.dialogService.showDialog = $event
    this.loading = false
  }

  confirmAction() {
    this.loading = true
    if (this.action === 'delete') this._deleteCategory()
    if (this.action === 'activate') this._activateCategory()
  }

  reloadCategories() {
    this.categoryParams = new CategoryParams()
    this._fetchCategories()
  }

  private _fetchCategories(): void {
    this.categorySvc.getCategories(this.categoryParams).subscribe({next: res => this.pagedList = res})
  }

  private _deleteCategory() {
    this.categorySvc.deleteCategory(this.category.slug).subscribe({
      next: () => this._performReload()
    })
  }

  private _activateCategory() {
    let formData = new FormData()
    formData.append('name', this.category.name)
    formData.append('active', 'true')
    this.categorySvc.updateCategory(formData, this.category.slug).subscribe({next: () => this._performReload()})
  }

  private _performReload() {
    setTimeout(() => {
      this.category = null
      this.dialogService.showDialog = false
      this.loading = false
      this.reloadCategories()
    }, 1000)
  }
}
