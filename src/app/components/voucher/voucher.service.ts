import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {VoucherParams} from "../../shared/models/voucher-params";
import {IVoucher} from "../../shared/interfaces/voucher";
import {environment} from "../../../environments/environment";
import {PaginationResponse} from "../../shared/models/pagination-response";

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  BASE_URL: string = environment.baseUrl

  constructor(private client: HttpClient) {
  }

  getVouchers(vParams: VoucherParams): Observable<PaginationResponse<IVoucher[]>> {
    let params = new HttpParams()
    params = params.append('Page', vParams.page)
    params = params.append('PageSize', vParams.pageSize)

    if (vParams.enabled !== undefined) {
      params = params.append('Enabled', vParams.enabled)
    }

    if(vParams.voucher !== '') {
      params = params.append('Voucher', vParams.voucher)
    }

    return this.client.get<PaginationResponse<IVoucher[]>>(
      `${this.BASE_URL}/v1/vouchers`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  addVoucher(voucher: any): Observable<IVoucher> {
    return this.client.post<IVoucher>(`${this.BASE_URL}/v1/vouchers`, voucher)
  }

  updateVoucher(update: any, voucher: string): Observable<IVoucher> {
    return this.client.put<IVoucher>(`${this.BASE_URL}/v1/vouchers/${voucher}`, update)
  }

  deleteVoucher(voucher: string): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/v1/vouchers/${voucher}`)
  }

  activateVoucher(voucher: string): Observable<IVoucher> {
    return this.client.put<IVoucher>(`${this.BASE_URL}/v1/vouchers/${voucher}/activate`, {})
  }
}
