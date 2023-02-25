import {Component, Input, OnInit} from '@angular/core';
import {DialogService} from "../../../../../shared/dialog/dialog.service";
import {PaginationResponse} from "../../../../../shared/models/pagination-response";
import {IUser} from "../../../../../shared/interfaces/user";
import {UserParams} from "../../../../../shared/models/user-params";
import {MemberService} from "../member.service";

@Component({
  selector: 'app-member',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit{
  @Input() showHeader: boolean = true
  @Input() showContentCard: boolean = true
  @Input() slug: string
  pagedList: PaginationResponse<IUser[]>
  userParams: UserParams = new UserParams()

  constructor(public dialogService: DialogService, private memberService: MemberService) {
  }
  ngOnInit(): void {
    this._fetchMembers()
  }

  onStatusChange(status: boolean) {
    this.userParams.enabled = status
    this._fetchMembers()
  }

  search(name: string) {
    this.userParams.name = name
    this._fetchMembers()
  }

  fetchItemsPerPage(pageSize: number) {
    this.userParams.pageSize = pageSize
    this._fetchMembers()
  }

  onPageChange(page: number) {
    console.log(page)
  }

  private _fetchMembers() {
    this.memberService.getMembers(this.userParams, this.slug).subscribe({next: res => this.pagedList = res})
  }
}
