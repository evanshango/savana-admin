import {Component, Input, OnInit} from '@angular/core';
import {SidebarMenu} from "./sidebar-data";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() menuClicked: boolean
  @Input() windowWidth: number
  actions: any = SidebarMenu

  ngOnInit(): void {

  }
}
