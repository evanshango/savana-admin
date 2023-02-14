import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Output() confirmAction = new EventEmitter<string>()
  @Output() clearDialog = new EventEmitter<boolean>()
  @Input() extras: { actionArea: boolean, title?: string, loading?: boolean, action?: string }

  constructor() {
  }

  ngOnInit() {

  }

  closeDialog() {
    this.clearDialog.emit(false)
  }

  performAction() {
    this.confirmAction.emit(this.extras.action && this.extras.action)
  }
}
