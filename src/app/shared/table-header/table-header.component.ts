import {Component, EventEmitter, Input, Output} from '@angular/core';
import {status} from "../common";

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  @Output() statusValue = new EventEmitter<boolean>()
  @Input() tableHeader: string
  @Input() selectLabel: string
  status = status

  onChange(value: boolean) {
    this.statusValue.emit(value)
  }
}
