import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<boolean>()
  menuIconClicked = false
  @Input() windowWidth: number
  menuIcon = faBars

  ngOnInit() {

  }

  toggleMenu() {
    this.menuIconClicked = !this.menuIconClicked
    this.menuClicked.emit(this.menuIconClicked)
  }
}
