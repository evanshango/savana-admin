import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../dashboard/components/management/group/group.service";
import {GroupParams} from "../../shared/models/group-params";
import {IGroup} from "../../shared/interfaces/group";
import {AccountService} from "../account.service";
import {ISignup} from "../../shared/interfaces/signup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  groups: IGroup[]
  signupForm: FormGroup;
  isSubmitting: boolean

  constructor(
    private fb: FormBuilder, private groupSvc: GroupService, private accountSvc: AccountService, private router: Router
  ) {
  }

  ngOnInit() {
    this._createSignupForm()
    this._fetchGroups()
  }

  onSubmit() {
    this.isSubmitting = true
    let phone = this.formatPhoneNo(this.signupForm.get('phoneNumber').value)
    let req = this.signupForm.value
    req.phoneNumber = phone
    this._createAccount(req)
  }

  formatPhoneNo(value: string): string {
    // Remove preceding 0
    let formattedNumber = value.replace(/^0+/, '');
    // Prepend +251
    formattedNumber = '254' + formattedNumber;
    // Separate in multiples of 3 using space
    formattedNumber = formattedNumber.match(/.{1,3}/g).join(' ');
    // Return formatted phoneNo with a '+' prefix
    return `+${formattedNumber}`
  }

  private _createSignupForm() {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      phoneNumber: new FormControl('', [Validators.required, Validators
        .pattern('^[0]{1}[0-9]{9}')]),
      accountType: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(6)])
    })
  }

  private _fetchGroups() {
    let params = new GroupParams()
    params.page = 1
    params.pageSize = 50
    this.groupSvc.getGroups(params).subscribe({
      next: res => {
        this.groups = res.items.length > 0 ? res.items.filter(g =>
          !(g.name.toLowerCase().includes('admin') || g.name.toLowerCase().includes('user'))
        ) : []
      }
    })
  }

  private _createAccount(value: any) {
    this.accountSvc.signUpUser(value).subscribe({next: res => this._performRedirect(res)})
  }

  private _performRedirect(res: ISignup) {
    if (res.statusCode === 201) {
      setTimeout(() => {
        this.isSubmitting = false
        this.router.navigateByUrl('/account/signin').then()
      }, 1000)
    }
  }
}
