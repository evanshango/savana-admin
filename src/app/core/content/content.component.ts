import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit{
  expand: boolean = true
  windowWidth!: number

  ngOnInit(): void {
    this.windowWidth = window.innerWidth
    this.expand = this.windowWidth > 768
  }

  onResize(width: number) {
    this.windowWidth = width
    this.expand = this.windowWidth > 768
  }

  collapse(state: boolean) {
    this.expand = state
  }
}
