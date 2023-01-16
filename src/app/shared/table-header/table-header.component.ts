import {AfterContentChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {status} from "../common";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit, AfterContentChecked {
  @Output() statusValue = new EventEmitter<boolean>()
  @Input() resetForm: boolean;
  @Input() tableHeader: string
  @Input() selectLabel: string
  statusForm: FormGroup;
  status = status

  constructor() {
  }

  onChange(value: any) {
    this.statusValue.emit(value['status'])
  }

  ngOnInit(): void {
    this._createStatusForm()
  }

  private _createStatusForm() {
    this.statusForm = new FormGroup({
      status: new FormControl(true, [Validators.required])
    })
  }

  ngAfterContentChecked(): void {
    if (this.resetForm) {
      this.statusForm.reset({status: true})
    }
  }
}
