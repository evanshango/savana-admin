import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../../../shared/dialog/dialog.service";
import {ICategory} from "../../../../shared/interfaces/category";
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {CategoryParams} from "../../../../shared/models/category-params";
import {CategoryService} from "../category.service";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {icons} from "../../../../shared/common";

@Component({
  selector: 'app-category',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  pagedList: PaginationResponse<ICategory[]>
  categoryParams: CategoryParams = new CategoryParams()
  icons: IconDefinition[] = icons()
  selectedCategory: ICategory
  showActionArea: boolean
  resetStatus: boolean
  dialogTitle: string
  action: string

  constructor(public dialogService: DialogService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this._fetchCategories()
  }

  openDialog(category: ICategory, action: string) {
    this.selectedCategory = category
    this.action = action
    this.showActionArea = false
    this.dialogTitle = this.selectedCategory ? 'Edit Category' : 'Add Category'
    this.dialogService.showDialog = true
  }

  onStatusChange(status: boolean) {
    this.categoryParams.enabled = status
    this._fetchCategories()
  }

  performSearch(name: string) {
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
    this.selectedCategory = category
    this.showActionArea = false
  }

  deleteCategory(category: ICategory, action: string) {
    this.action = action
    this.selectedCategory = category
    this.showActionArea = true
    this.dialogTitle = 'Delete Category'
    this.dialogService.showDialog = true
  }

  closeDialog($event: boolean) {
    this.dialogService.showDialog = $event
  }

  confirmAction() {
    /**
     * TODO
     * Handle category delete and activate
     */
  }

  reloadCategories() {
    this.categoryParams = new CategoryParams()
    this._fetchCategories()
  }

  private _fetchCategories(): void {
    this.categoryService.getCategories(this.categoryParams).subscribe({next: res => this.pagedList = res})
  }

  getIcon(iconName: string): IconDefinition {
    return this.icons.find(ic => ic.iconName === iconName);
  }
}
