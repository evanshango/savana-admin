import {Component, OnInit} from '@angular/core';
import {MemberService} from "../member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IUser} from "../../../../../shared/interfaces/user";
import {getTabIndex, setTabIndex} from "../../../../../shared/common";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  tabs: string[] = ['General', 'Products']
  isEditClicked: boolean
  activatedTabIndex: number
  user: IUser

  constructor(private activatedRoute: ActivatedRoute, private memberService: MemberService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedTabIndex = getTabIndex('users')
    let userId = this.activatedRoute.snapshot.paramMap.get('id')
    if (userId) this._fetchUserById(userId)
  }

  onTabChange(tabIndex: number) {
    this.activatedTabIndex = tabIndex
    setTabIndex(this.activatedTabIndex, 'users')
  }

  private _fetchUserById(userId: string) {
    this.memberService.getMemberById(userId).subscribe({
      next: res => this.user = res,
      error: async () => await this.router.navigateByUrl('/users')
    })
  }

  editInfo() {
    this.isEditClicked = !this.isEditClicked
  }
}
