import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Output() clearDialog = new EventEmitter<boolean>()
  @Output() confirmAction = new EventEmitter<string>()
  @Input() showActionArea: boolean
  @Input() dialogTitle: string
  @Input() action: string

  constructor() {
  }

  ngOnInit() {

  }

  closeDialog() {
    this.clearDialog.emit(false)
  }

  performAction() {
    this.confirmAction.emit(this.action)
  }
}
