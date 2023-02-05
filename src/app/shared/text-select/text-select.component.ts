import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {PaginationResponse} from "../models/pagination-response";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {ISelected} from "../common";

@Component({
  selector: 'app-text-select',
  templateUrl: './text-select.component.html',
  styleUrls: ['./text-select.component.scss']
})
export class TextSelectComponent implements OnInit {
  @Output() selected = new EventEmitter<{ type: string, id: string, name: string, tag?: string, multiple: boolean }>()
  @Output() pageSelected = new EventEmitter<{ type: string, page: number }>()
  @Input() pagedList: PaginationResponse<any>
  @Input() items: ISelected[]
  @Input() multiple: boolean
  @Input() label: string
  @Input() type: string
  isShown: boolean
  caret = faCaretDown

  constructor(private eRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (!this.eRef.nativeElement.contains(event.target) && this.isShown) this.isShown = false
  }

  onItemSelected(id: string, name: string, tag: string) {
    this.isShown = false
    this.selected.emit({type: this.type, id: id, name: name, tag: tag, multiple: this.multiple})
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
