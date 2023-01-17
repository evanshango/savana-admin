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
  @Input() resetStatus: boolean;
  @Input() resetSearch: boolean
  @Input() selectLabel: string
  statusForm: FormGroup;
  searchForm: FormGroup
  status = status
  pages = pages

  constructor() {
  }

  ngOnInit(): void {
    this._createStatusForm()
    this._createSearchForm()
  }

  onChange(value: any) {
    this.statusValue.emit(value['status'])
  }

  ngAfterContentChecked(): void {
    if (this.resetStatus) {
      this.statusForm.reset({status: null})
    }

    if (this.resetSearch) {
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

  onPageSizeChange(pageSize: number) {
    this.pageSize.emit(pageSize)
  }
}
