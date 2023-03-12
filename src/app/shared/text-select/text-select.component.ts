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
  @Output() search = new EventEmitter<{type: string, term: string}>()
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

  onChange(searchParam: string) {
    this.search.emit({type: this.type, term: searchParam})
  }
}
