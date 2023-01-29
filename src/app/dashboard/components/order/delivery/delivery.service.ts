import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {DeliveryMethodParams} from "../../../../shared/models/delivery-method-params";
import {map, Observable} from "rxjs";
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {IDeliveryMethod} from "../../../../shared/interfaces/delivery-method";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  BASE_URL: string = environment.baseUrl

  constructor(private client: HttpClient) {
  }

  getDeliveryMethods(deliveryParams: DeliveryMethodParams): Observable<PaginationResponse<IDeliveryMethod[]>> {
    let params = new HttpParams()
    params = params.append('Page', deliveryParams.page)
    params = params.append('PageSize', deliveryParams.pageSize)

    if (deliveryParams.enabled !== undefined) {
      params = params.append('Enabled', deliveryParams.enabled)
    }

    if (deliveryParams.title !== '') {
      params = params.append('Title', deliveryParams.title)
    }

    return this.client.get<PaginationResponse<IDeliveryMethod[]>>(
      `${this.BASE_URL}/v1/delivery/methods`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  addDeliveryMethod(method: any): Observable<IDeliveryMethod> {
    return this.client.post<IDeliveryMethod>(`${this.BASE_URL}/v1/delivery/methods`, method)
  }

  updateDeliveryMethod(method: any, methodId: string): Observable<IDeliveryMethod> {
    return this.client.put<IDeliveryMethod>(`${this.BASE_URL}/v1/delivery/methods/${methodId}`, method)
  }

  deleteDeliveryMethod(methodId: string): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/v1/delivery/methods/${methodId}`)
  }
}
