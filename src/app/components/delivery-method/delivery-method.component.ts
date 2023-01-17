import {Component, OnInit} from '@angular/core';
import {IDeliveryMethod} from "../../shared/interfaces/delivery-method";
import {DeliveryMethodParams} from "../../shared/models/delivery-method-params";
import {PaginationResponse} from "../../shared/models/pagination-response";
import {DeliveryMethodService} from "./delivery-method.service";
import {DialogService} from "../../shared/dialog/dialog.service";

@Component({
  selector: 'app-delivery-method',
  templateUrl: './delivery-method.component.html',
  styleUrls: ['./delivery-method.component.scss']
})
export class DeliveryMethodComponent implements OnInit {
  deliveryParams: DeliveryMethodParams = new DeliveryMethodParams()
  pagedList: PaginationResponse<IDeliveryMethod[]>
  resetStatus: boolean
  resetSearch: boolean
  dialogTitle: string
  showActionArea: boolean
  action: string
  method: IDeliveryMethod

  constructor(private deliverMethodService: DeliveryMethodService, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._fetchDeliveryMethods()
  }

  openDialog(method: IDeliveryMethod) {
    this.action = 'edit'
    this.method = method
    this.showActionArea = false
    this.dialogTitle = this.method ? 'Edit Delivery Method' : 'Add Delivery Method'
    this.dialogService.showDialog = true
  }

  onStatusChange(status: boolean) {
    this.deliveryParams.enabled = status
    this._fetchDeliveryMethods()
  }

  performSearch(title: string) {
    this.deliveryParams.title = title.length > 3 ? title : ''
    this._fetchDeliveryMethods()
  }

  fetchItemsPerPage(pageSize: number) {
    this.deliveryParams.pageSize = pageSize
    this._fetchDeliveryMethods()
  }

  private _fetchDeliveryMethods() {
    this.deliverMethodService.getDeliveryMethods(this.deliveryParams).subscribe(res => this.pagedList = res)
  }

  activateMethod(method: IDeliveryMethod) {
    this.action = 'activate'
    this.method = method
    this.showActionArea = true
    this.dialogTitle = 'Activate Delivery Method'
    this.dialogService.showDialog = true
  }

  deleteMethod(method: IDeliveryMethod) {
    this.action = 'delete'
    this.method = method
    this.showActionArea = true
    this.dialogTitle = 'Delete Delivery Method'
    this.dialogService.showDialog = true
  }

  onPageChange(page: number) {
    console.log(page)
  }

  confirmAction($event: string) {
    if ($event === 'delete') {
      this._deleteDeliveryMethod()
      return
    }

    if ($event === 'activate') {
      this._activateDeliveryMethod()
      return;
    }
  }

  closeDialog($event: boolean) {
    this.dialogService.showDialog = $event
    this.method = null
    this.action = ''
  }

  reloadMethods() {
    this._fetchDeliveryMethods()
    this.resetStatus = true
  }

  private _deleteDeliveryMethod() {
    this.deliverMethodService.deleteDeliveryMethod(this.method.id).subscribe(() => this._performReload())
  }

  private _activateDeliveryMethod() {

  }

  private _performReload() {
    setTimeout(() => {
      this.method= null
      this.dialogService.showDialog = false
      this.reloadMethods()
    }, 1000)
  }
}
