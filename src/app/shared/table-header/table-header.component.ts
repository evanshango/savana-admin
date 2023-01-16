import {AfterContentChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {pages, status} from "../common";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit, AfterContentChecked {
  @Output() statusValue = new EventEmitter<boolean>()
  @Output() search = new EventEmitter<string>()
  @Output() pageSize = new EventEmitter<number>()
  @Input() resetVoucherStatus: boolean;
  @Input() resetVoucherSearch: boolean
  @Input() selectLabel: string
  statusForm: FormGroup;
  searchForm: FormGroup
  pageForm: FormGroup
  status = status
  pages = pages

  constructor() {
  }

  ngOnInit(): void {
    this._createPageForm()
    this._createStatusForm()
    this._createSearchForm()
  }

  onChange(value: any) {
    this.statusValue.emit(value['status'])
  }

  ngAfterContentChecked(): void {
    if (this.resetVoucherStatus) {
      this.statusForm.reset({status: null})
    }

    if (this.resetVoucherSearch) {
      this.searchForm.reset()
    }
  }

  performSearch() {
    this.search.emit(this.searchTerm)
  }

  get searchTerm() {
    return this.searchForm.value['search']
  }

  private _createSearchForm() {
    this.searchForm = new FormGroup({
      search: new FormControl('', [Validators.required])
    })
  }

  private _createStatusForm() {
    this.statusForm = new FormGroup({
      status: new FormControl(null, [Validators.required])
    })
  }

  private _createPageForm() {
    this.pageForm = new FormGroup({
      page: new FormControl(20, Validators.required)
    })
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize.emit(pageSize)
  }
}
