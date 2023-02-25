import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {pages, status} from "../common";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {
  @Output() statusValue = new EventEmitter<boolean>()
  @Output() search = new EventEmitter<string>()
  @Output() pageSize = new EventEmitter<number>()
  @Input() placeholder: string
  @Input() selectLabel: string
  statusForm: FormGroup;
  status = status
  pages = pages

  constructor() {
  }

  ngOnInit(): void {
    this._createStatusForm()
  }

  onChange(value: any) {
    this.statusValue.emit(value['status'])
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize.emit(pageSize)
  }

  onSearch(searchTerm: string) {
    this.search.emit(searchTerm)
  }

  private _createStatusForm() {
    this.statusForm = new FormGroup({
      status: new FormControl(null, [Validators.required])
    })
  }
}
