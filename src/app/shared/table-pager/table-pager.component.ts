import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-pager',
  templateUrl: './table-pager.component.html',
  styleUrls: ['./table-pager.component.scss']
})
export class TablePagerComponent implements OnInit {
  @Output() pageChanged = new EventEmitter<number>()
  @Input() totalPages: number
  @Input() totalCount: number
  @Input() pageSize: number
  @Input() pageNo: number

  ngOnInit(): void {
  }

  prevPage(page: number) {
    this.pageChanged.emit(page)
  }

  nextPage(page: number) {
    this.pageChanged.emit(page)
  }
}
