import {Component, OnInit} from '@angular/core';
import {AccountService} from "./account/account.service";
import {TOKEN_KEY} from "./shared/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this._loadCurrentUser()
  }

  private _loadCurrentUser() {
    this.accountService.getCurrentUser(sessionStorage.getItem(TOKEN_KEY)).subscribe(() => {
    })
  }
}
