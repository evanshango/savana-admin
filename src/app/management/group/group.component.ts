import {Component, OnInit} from '@angular/core';
import {PaginationResponse} from "../../shared/models/pagination-response";
import {IGroup} from "../../shared/interfaces/group";
import {GroupParams} from "../../shared/models/group-params";
import {GroupService} from "./group.service";
import {DialogService} from "../../shared/dialog/dialog.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  pagedList: PaginationResponse<IGroup[]>
  groupParams: GroupParams = new GroupParams()
  resetStatus: boolean

  constructor(private groupService: GroupService, public dialogService: DialogService) {
  }

  ngOnInit() {
    this._fetchGroups()
  }

  onStatusChange(status: boolean) {
    this.groupParams.enabled = status
    this._fetchGroups()
  }

  performSearch(groupName: string) {
    this.groupParams.name = groupName
    this._fetchGroups()
  }

  fetchItemsPerPage(pageSize: number) {
    this.groupParams.pageSize = pageSize
    this._fetchGroups()
  }

  onPageChange(page: number) {
    this.groupParams.page = page
    this._fetchGroups()
  }

  closeDialog($event: boolean) {
    this.dialogService.showDialog = $event
  }

  private _fetchGroups() {
    this.groupService.getGroups(this.groupParams).subscribe(res => this.pagedList = res)
  }

  reloadGroups() {
    this.groupParams = new GroupParams()
    this._fetchGroups()
  }
}
