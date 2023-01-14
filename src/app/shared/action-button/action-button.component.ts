import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit{
  @Input() item: any

  constructor() {
  }

  ngOnInit(): void {
  }

  onDelete(item: any) {
    console.log(item)
  }

  openDialogForUpdate(item: any) {
    console.log(item)
  }
}
