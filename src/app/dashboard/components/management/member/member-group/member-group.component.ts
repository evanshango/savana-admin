import {Component, Input, OnInit} from '@angular/core';
import {IGroup} from "../../../../../shared/interfaces/group";
import {GroupParams} from "../../../../../shared/models/group-params";
import {GroupService} from "../../group/group.service";
import {PaginationResponse} from "../../../../../shared/models/pagination-response";
import {MemberService} from "../member.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-member-group',
  templateUrl: './member-group.component.html',
  styleUrls: ['./member-group.component.scss']
})
export class MemberGroupComponent implements OnInit {
  @Input() userGroups: IGroup[]
  @Input() userId: string
  groupParams: GroupParams = new GroupParams()
  pagedList: PaginationResponse<IGroup[]>
  selectedGroups: IGroup[] = []
  isSubmitting: boolean
  isTouched: boolean

  constructor(private groupService: GroupService, private memberService: MemberService, private router: Router) {
  }

  ngOnInit(): void {
    this._fetchGroups()
    this.selectedGroups = [...this.userGroups]
  }

  nextPage() {
    this.groupParams.page++
    this._fetchGroups()
  }

  prevPage() {
    this.groupParams.page = --this.groupParams.page < 1 ? 1 : this.groupParams.page
    this._fetchGroups()
  }

  addGroup(group: IGroup) {
    this.isTouched = true
    if (!this.selectedGroups.find(gr => gr.id === group.id)) this.selectedGroups.push(group)
  }

  removeGroup(group: IGroup) {
    this.isTouched = true
    let existingIndex = this.selectedGroups.findIndex(gr => gr.id === group.id)
    if (existingIndex > -1) this.selectedGroups.splice(existingIndex, 1)
  }

  updateGroups() {
    this.isSubmitting = true
    let groups = {groupIds: this._getGroupIds(this.selectedGroups)}
    this.memberService.updateMemberGroups(this.userId, groups).subscribe({
      next: res => {
        this.isTouched = this.isSubmitting = false
        this.selectedGroups = res.groups
        setTimeout(() => this.router.navigateByUrl('/users'), 1000)
      }
    })
  }

  private _fetchGroups() {
    this.groupService.getGroups(this.groupParams).subscribe({next: res => this.pagedList = res})
  }

  private _getGroupIds(groups: IGroup[]): string[] {
    return groups.map(gr => gr.id)
  }
}
