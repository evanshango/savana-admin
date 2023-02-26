import {Component, OnInit} from '@angular/core';
import {PromotionService} from "../promotion.service";
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {IPromotion} from "../../../../shared/interfaces/promotion";
import {PromotionParams} from "../../../../shared/models/promotion-params";
import {DialogService} from "../../../../shared/dialog/dialog.service";

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent implements OnInit {
  promoParams: PromotionParams = new PromotionParams()
  pagedList: PaginationResponse<IPromotion[]>
  actionArea: boolean
  loading: boolean
  dialogTitle: string = ''
  action: string
  selectedPromo: IPromotion

  constructor(private promoSvc: PromotionService, public dialogSvc: DialogService) {
  }

  ngOnInit() {
    this._fetchPromotions()
  }

  openDialog(promo: IPromotion, action: string) {
    this.dialogSvc.showDialog = true
    this.action = action
    this.selectedPromo = promo !== null && promo
    this.dialogTitle = promo !== null ? 'Edit Promotion' : 'Add Promotion'
  }

  search(searchTerm: string) {
    this.promoParams.searchTerm = searchTerm
    this._fetchPromotions()
  }

  onStatusChange(status: boolean) {
    this.promoParams.enabled = status
    this._fetchPromotions()
  }

  fetchItemsPerPage(pageSize: number) {
    this.promoParams.pageSize = pageSize
    this._fetchPromotions()
  }

  onPageChange(page: number) {
    this.promoParams.page = page
    this._fetchPromotions()
  }

  activatePromo(promo: IPromotion, action: string) {
    this.dialogSvc.showDialog = true
    this.action = action
    this.selectedPromo = promo
    this.actionArea = true
    this.dialogTitle = 'Activate Promotion'
  }

  deletePromo(promo: IPromotion, action: string) {
    this.dialogSvc.showDialog = true
    this.action = action
    this.selectedPromo = promo
    this.actionArea = true
    this.dialogTitle = 'Delete Promotion'
  }

  closeDialog($event: boolean) {
    this.dialogSvc.showDialog = $event
  }

  confirmAction() {
    this.loading = true
    this.action === 'delete' ? this._deletePromotion() : this._activatePromotion()
  }

  reloadPromotions() {
    this.promoParams = new PromotionParams()
    this._fetchPromotions()
  }

  private _fetchPromotions() {
    this.promoSvc.getPromotions(this.promoParams).subscribe({next: res => this.pagedList = res})
  }

  private _deletePromotion() {
    this.promoSvc.deletePromo(this.selectedPromo.id).subscribe({next: () => this._performReload()})
  }

  private _activatePromotion() {
    this.promoSvc.activatePromo(this.selectedPromo.id).subscribe({
      next: res => {
        if (res) {
          this._performReload()
        }
      }
    })
  }

  private _performReload() {
    setTimeout(() => {
      this.selectedPromo = null
      this.loading = false
      this.dialogSvc.showDialog = false
      this.reloadPromotions()
    }, 1000)
  }

  getExpiry(expiresAt: Date): boolean {
    return new Date().toISOString() > new Date(expiresAt).toISOString()
  }
}
