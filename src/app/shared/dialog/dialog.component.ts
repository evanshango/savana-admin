import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogService} from "./dialog.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  @Output() clearDialog = new EventEmitter<boolean>()
  @Input() dialogTitle: string
  @Input() showActionArea: boolean
  @Input() item?: any

  constructor(public dialogService: DialogService) {
  }

  ngOnInit() {
    console.log(this.item)
  }

  hideDialog() {
    this.dialogService.showDialog = false
  }

  closeDialog() {
    this.clearDialog.emit(false)
  }
}
