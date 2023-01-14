import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TOKEN_KEY} from "../../shared/common";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  returnUrl: string;

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._loadUser().then()
    this.returnUrl = this.activatedRoute.snapshot.queryParams['return_url'] || '/';
    this.createSigninForm();
  }

  onSubmit(): void {
    this.accountService.signInUser(this.signinForm.value).subscribe(
      async () => await this.router.navigateByUrl(this.returnUrl)
    )
  }

  async _loadUser(): Promise<void> {
    let token = sessionStorage.getItem(TOKEN_KEY)
    if (token) {
      await this.router.navigateByUrl(this.returnUrl)
    }
  }

  private createSigninForm() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }
}
