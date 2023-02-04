import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationResponse} from "../models/pagination-response";

@Component({
  selector: 'app-text-select',
  templateUrl: './text-select.component.html',
  styleUrls: ['./text-select.component.scss']
})
export class TextSelectComponent implements OnInit {
  @Output() selected = new EventEmitter<{ type: string, id: string, name: string }>()
  @Output() pageSelected = new EventEmitter<{ type: string, page: number }>()
  @Input() pagedList: PaginationResponse<any>
  @Input() label: string
  @Input() type: string

  constructor() {
  }

  ngOnInit(): void {
  }

  onItemSelected(id: string, name: string) {
    this.selected.emit({type: this.type, id: id, name: name})
  }

  prevPage() {
    let page = --this.pagedList.metaData.pageNo
    this.pageSelected.emit({type: this.type, page: page < 1 ? 1 : page})
  }

  nextPage() {
    let page = ++this.pagedList.metaData.pageNo
    this.pageSelected.emit({
      type: this.type, page: page > this.pagedList.metaData.totalPages ? this.pagedList.metaData.totalPages : page
    })
  }
}
