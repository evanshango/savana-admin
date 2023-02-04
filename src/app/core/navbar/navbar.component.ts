import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {faBars, faCaretDown, faSignOutAlt, faSquarePlus, faUserAlt} from '@fortawesome/free-solid-svg-icons'
import {AccountService} from "../../account/account.service";
import {ISignin} from "../../shared/interfaces/signin";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() collapse = new EventEmitter<boolean>()
  @Input() windowWidth: number
  @Input() expand!: boolean
  user$: Observable<ISignin>
  isShown: boolean
  menuIcon = faBars
  accountIcon = faCaretDown
  user = faUserAlt
  email = faSquarePlus
  signOut = faSignOutAlt

  constructor(private accountService: AccountService, private eRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (!this.eRef.nativeElement.contains(event.target) && this.isShown) this.isShown = false
  }

  ngOnInit() {
    this.user$ = this.accountService.userSource$
  }

  collapseEvent() {
    this.expand = !this.expand
    this.collapse.emit(this.expand)
  }

  async signOutUser() {
    await this.accountService.signOutUser('/account/signin')
  }
}
