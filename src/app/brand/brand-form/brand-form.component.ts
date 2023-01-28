import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IBrand} from "../../shared/interfaces/brand";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../brand.service";
import {DialogService} from "../../shared/dialog/dialog.service";

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {
  @Output() reloadBrands = new EventEmitter<any>()
  @Input() action: string
  @Input() brand: IBrand
  brandForm: FormGroup
  isSubmitting: boolean

  constructor(private fb: FormBuilder, private brandService: BrandService, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._createBrandForm()
    if (this.brand) {
      this.brandForm.patchValue(this.brand)
    }
  }

  onSubmit() {
    this.isSubmitting = true
    if (this.action === 'edit') {
      this._updateBrand()
      return
    }
    if (this.action === 'add') {
      this._addBrand()
      return
    }
  }

  private _createBrandForm(): void {
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      active: [true]
    })
  }

  private _addBrand(): void {
    this.brandService.addBrand(this.brandForm.value).subscribe({next: res => this._quitDialog(res)})
  }

  private _updateBrand(): void {
    this.brandService.updateBrand(this.brandForm.value, this.brand.slug).subscribe(
      {next: res => this._quitDialog(res)}
    )
  }

  private _quitDialog(brand: IBrand): void {
    if (brand != null) {
      setTimeout(() => {
        this.isSubmitting = false
        this.dialogService.showDialog = false
        this.reloadBrands.emit()
      }, 2000)
    } else {
      this.brandForm.reset()
      this.isSubmitting = false
      this.dialogService.showDialog = false
    }
  }
}
