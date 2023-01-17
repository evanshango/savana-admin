import {Component, ElementRef, Input, OnInit, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit, ControlValueAccessor {
  @ViewChild('description', {static: true}) textarea: ElementRef
  @Input() rows: number
  @Input() cols: number
  @Input() label: string
  @Input() minLength = 0

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this
  }

  ngOnInit(): void {
    const control = this.controlDir.control
    const validators = control?.validator ? [control.validator] : []
    const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : []

    control?.setValidators(validators)
    control?.setAsyncValidators(asyncValidators)
    control?.updateValueAndValidity()
  }

  onChange(value: any) {

  }

  onTouched() {
    if (this.minLength < 0) {
      this.minLength = 0
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(obj: any): void {
    this.textarea.nativeElement.value = obj || ''
  }
}
