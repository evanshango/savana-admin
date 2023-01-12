import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentWindowWidth: number
  @Input() menuClicked: boolean
  hideSideBar: boolean

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth
    this.menuClicked = this.currentWindowWidth <= 768
  }

  windowsResize(event: any): void {
    this.currentWindowWidth = event.target.innerWidth
    this.menuClicked = this.currentWindowWidth <= 768
  }

  toggleSidebar(): void {
    this.menuClicked = !this.menuClicked
  }

  hideBar(event: any) {
    this.hideSideBar = event
  }
}
