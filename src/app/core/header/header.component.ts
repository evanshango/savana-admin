import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {faBars, faSignOutAlt, faSquarePlus, faUserAlt, faUserCog} from '@fortawesome/free-solid-svg-icons'
import {AccountService} from "../../account/account.service";
import {ISigninResponse} from "../../shared/interfaces/signin-response";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<boolean>()
  menuIconClicked = false
  @Input() windowWidth: number
  user$: Observable<ISigninResponse>
  isShown: boolean
  menuIcon = faBars
  accountIcon = faUserCog
  user = faUserAlt
  email = faSquarePlus
  signOut = faSignOutAlt

  constructor(private accountService: AccountService, private eRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (!this.eRef.nativeElement.contains(event.target) && this.isShown){
      this.isShown = false
    }
  }

  ngOnInit() {
    this.user$ = this.accountService.userSource$
  }

  toggleMenu() {
    this.menuIconClicked = !this.menuIconClicked
    this.menuClicked.emit(this.menuIconClicked)
  }

  showAction() {
    this.isShown = !this.isShown
  }

  async signOutUser() {
    await this.accountService.signOutUser('/account/signin')
  }
}
