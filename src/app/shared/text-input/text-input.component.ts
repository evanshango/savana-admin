import {Component, ElementRef, Input, OnInit, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', {static: true}) input: ElementRef
  @Input() type = 'text'
  @Input() label: string
  @Input() enabled: boolean
  @Input() isReadOnly = false
  @Input() min = 0
  @Input() max: number

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

  onChange(event: any) {

  }

  onTouched() {
    if (this.min < 0) {
      this.min = 0
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || ''
  }

}
