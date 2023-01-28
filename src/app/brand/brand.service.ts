import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {PaginationResponse} from "../shared/models/pagination-response";
import {BrandParams} from "../shared/models/brand-params";
import {IBrand} from "../shared/interfaces/brand";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  BASE_URL = environment.baseUrl

  constructor(private client: HttpClient) {
  }

  getBrands(brandParams: BrandParams): Observable<PaginationResponse<IBrand[]>> {
    let params = new HttpParams()
    params = params.append('Page', brandParams.page)
    params = params.append('PageSize', brandParams.pageSize)

    if (brandParams.enabled !== undefined) {
      params = params.append('Enabled', brandParams.enabled)
    }

    if (brandParams.name !== '') {
      params = params.append('Name', brandParams.name)
    }

    if (brandParams.orderBy !== '') {
      params = params.append('OrderBy', brandParams.orderBy)
    }

    return this.client.get<PaginationResponse<IBrand[]>>(
      `${this.BASE_URL}/v1/brands`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  addBrand(brand: any): Observable<IBrand> {
    return this.client.post<IBrand>(`${this.BASE_URL}/v1/brands`, brand)
  }

  updateBrand(brand: any, slug: string): Observable<IBrand> {
    return this.client.put<IBrand>(`${this.BASE_URL}/v1/brands/${slug}`, brand)
  }

  deleteBrand(slug: string): Observable<void>{
    return this.client.delete<any>(`${this.BASE_URL}/v1/brands/${slug}`)
  }
}
