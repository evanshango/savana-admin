import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {VoucherParams} from "../../shared/models/voucher-params";
import {IVoucherResponse} from "../../shared/interfaces/voucher-response";
import {environment} from "../../../environments/environment";
import {PaginationResponse} from "../../shared/models/pagination-response";

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  BASE_URL: string = environment.baseUrl

  constructor(private client: HttpClient) {
  }

  getVouchers(vParams: VoucherParams): Observable<PaginationResponse<IVoucherResponse[]>> {
    let params = new HttpParams()
    params = params.append('Page', vParams.page)
    params = params.append('PageSize', vParams.pageSize)
    params = params.append('Enabled', vParams.enabled)

    return this.client.get<PaginationResponse<IVoucherResponse[]>>(
      `${this.BASE_URL}/v1/vouchers`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  addVoucher(voucher: any): Observable<IVoucherResponse> {
    return this.client.post<IVoucherResponse>(`${this.BASE_URL}/v1/vouchers`, voucher)
  }
}
