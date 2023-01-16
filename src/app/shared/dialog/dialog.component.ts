import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Output() clearDialog = new EventEmitter<boolean>()
  @Output() confirmAction = new EventEmitter<void>()
  @Input() dialogTitle: string
  @Input() showActionArea: boolean

  constructor() {
  }

  ngOnInit() {

  }

  closeDialog() {
    this.clearDialog.emit(false)
  }

  performAction() {
    this.confirmAction.emit()
  }
}
