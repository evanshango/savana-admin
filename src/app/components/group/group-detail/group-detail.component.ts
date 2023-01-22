import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../group.service";
import {IGroup} from "../../../shared/interfaces/group";
import {getTabIndex, setTabIndex} from "../../../shared/common";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  tabs: string[] = ['General', 'Members']
  activatedTabIndex: number
  group: IGroup

  constructor(private activatedRoute: ActivatedRoute, private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.activatedTabIndex = getTabIndex()
    let groupSlug = this.activatedRoute.snapshot.paramMap.get('slug')
    if (groupSlug) this._fetchGroupBySlug(groupSlug)
  }

  private _fetchGroupBySlug(groupSlug: string) {
    this.groupService.getGroup(groupSlug).subscribe(res => this.group = res)
  }

  onTabChange(tabIndex: number) {
    this.activatedTabIndex = tabIndex
    setTabIndex(this.activatedTabIndex)
  }
}
