import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../../../shared/interfaces/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: IProduct
  productForm: FormGroup;
  modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, false]}],
      [{'font': ['Sans Serif', 'monospace']}],
      [{'align': []}],
      ['bold', 'italic', 'underline'],
      [{'color': []}],
      [],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      ['image'],
    ]
  }

  constructor(private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this._createProductForm()
  }

  onSubmit() {
    console.log(this.productForm.value.detail)
  }

  private _createProductForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      stock: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      categories: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      owner: ['', Validators.required],
      detail: ['', Validators.required]
    })
  }
}
