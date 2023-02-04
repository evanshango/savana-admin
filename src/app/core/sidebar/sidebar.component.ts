import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SidebarMenu} from "./sidebar-data";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() collapse = new EventEmitter<boolean>()
  @Input() windowWidth!: number
  @Input() expand!: boolean
  actions: any = SidebarMenu

  ngOnInit(): void {

  }
}
