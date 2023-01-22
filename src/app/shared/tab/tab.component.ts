import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Output() onTabChange = new EventEmitter<number>()
  @Input() activatedTabIndex: number
  @Input() tabs: string[]
  @Input() item: any

  constructor() {
  }

  ngOnInit(): void {

  }

  onTabClick(index: number): void {
    this.onTabChange.emit(index)
  }
}
