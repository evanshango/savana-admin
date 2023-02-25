import {Component, OnInit} from '@angular/core';
import {IDeliveryMethod} from "../../../../../shared/interfaces/delivery-method";
import {DeliveryMethodParams} from "../../../../../shared/models/delivery-method-params";
import {PaginationResponse} from "../../../../../shared/models/pagination-response";
import {DeliveryService} from "../delivery.service";
import {DialogService} from "../../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {
  deliveryParams: DeliveryMethodParams = new DeliveryMethodParams()
  pagedList: PaginationResponse<IDeliveryMethod[]>
  dialogTitle: string
  actionArea: boolean
  loading: boolean
  action: string
  method: IDeliveryMethod

  constructor(private deliverMethodSvc: DeliveryService, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this._fetchDeliveryMethods()
  }

  openDialog(method: IDeliveryMethod) {
    this.action = 'edit'
    this.method = method
    this.actionArea = false
    this.dialogTitle = this.method ? 'Edit Delivery Method' : 'Add Delivery Method'
    this.dialogService.showDialog = true
  }

  onStatusChange(status: boolean) {
    this.deliveryParams.enabled = status
    this._fetchDeliveryMethods()
  }

  search(title: string) {
    this.deliveryParams.title = title.length > 3 ? title : ''
    this._fetchDeliveryMethods()
  }

  fetchItemsPerPage(pageSize: number) {
    this.deliveryParams.pageSize = pageSize
    this._fetchDeliveryMethods()
  }

  activateMethod(method: IDeliveryMethod) {
    this.action = 'activate'
    this.method = method
    this.actionArea = true
    this.dialogTitle = 'Activate Delivery Method'
    this.dialogService.showDialog = true
  }

  deleteMethod(method: IDeliveryMethod) {
    this.action = 'delete'
    this.method = method
    this.actionArea = true
    this.dialogTitle = 'Delete Delivery Method'
    this.dialogService.showDialog = true
  }

  onPageChange(page: number) {
    this.deliveryParams.page = page
    this._fetchDeliveryMethods()
  }

  confirm($event: string) {
    this.loading = true
    $event === 'delete' ? this._deleteDeliveryMethod() : this._activateDeliveryMethod()
  }

  closeDialog($event: boolean) {
    this.dialogService.showDialog = $event
    this.method = null
    this.action = ''
    this.loading = false
  }

  reloadMethods() {
    this.deliveryParams = new DeliveryMethodParams()
    this._fetchDeliveryMethods()
  }

  private _fetchDeliveryMethods() {
    this.deliverMethodSvc.getDeliveryMethods(this.deliveryParams).subscribe({next: res => this.pagedList = res})
  }

  private _deleteDeliveryMethod() {
    this.deliverMethodSvc.deleteDeliveryMethod(this.method.id).subscribe({next: () => this._performReload()})
  }

  private _activateDeliveryMethod() {
    this.method.active = true
    this.deliverMethodSvc.updateDeliveryMethod(this.method, this.method.id).subscribe({
      next: res => {
        if (res) {
          this._performReload()
        }
      }
    })
  }

  private _performReload() {
    setTimeout(() => {
      this.method = null
      this.dialogService.showDialog = false
      this.loading = false
      this.reloadMethods()
    }, 1000)
  }
}
