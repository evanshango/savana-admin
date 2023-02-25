import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PaginationResponse} from "../../../shared/models/pagination-response";
import {IPromotion} from "../../../shared/interfaces/promotion";
import {PromotionParams} from "../../../shared/models/promotion-params";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  BASE_URL: string = environment.baseUrl

  constructor(private client: HttpClient) {
  }

  getPromotions(promoParams: PromotionParams): Observable<PaginationResponse<IPromotion[]>> {
    let params = new HttpParams()
    params = params.append('Page', promoParams.page)
    params = params.append('PageSize', promoParams.pageSize)

    if (promoParams.enabled !== undefined) {
      params = params.append('Enabled', promoParams.enabled)
    }

    if (promoParams.searchTerm !== '') {
      params = params.append('SearchTerm', promoParams.searchTerm)
    }

    if (promoParams.orderBy !== '') {
      params = params.append('OrderBy', promoParams.orderBy)
    }

    return this.client.get<PaginationResponse<IPromotion[]>>(
      `${this.BASE_URL}/v1/promotions`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  addPromotion(promo: any): Observable<IPromotion> {
    return this.client.post<IPromotion>(`${this.BASE_URL}/v1/promotions`, promo)
  }

  updatePromo(update: any, promoId: string): Observable<IPromotion> {
    return this.client.put<IPromotion>(`${this.BASE_URL}/v1/promotions/${promoId}`, update)
  }

  deletePromo(promoId: string): Observable<any>{
    return this.client.delete(`${this.BASE_URL}/v1/promotions/${promoId}`)
  }

  activatePromo(promoId: string): Observable<IPromotion> {
    return this.client.put<IPromotion>(`${this.BASE_URL}/v1/promotions/${promoId}/activate`, {})
  }
}
