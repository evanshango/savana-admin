import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IProduct} from "../../../shared/interfaces/product";
import {PaginationResponse} from "../../../shared/models/pagination-response";
import {ProductParams} from "../../../shared/models/product-params";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL: string = environment.baseUrl

  constructor(private client: HttpClient) {
  }

  getProducts(productParams: ProductParams): Observable<PaginationResponse<IProduct[]>> {
    let params = new HttpParams()
    params = params.append('Page', productParams.page)
    params = params.append('PageSize', productParams.pageSize)

    if (productParams.enabled !== undefined) {
      params = params.append('Enabled', productParams.enabled)
    }

    if (productParams.searchTerm !== '') {
      params = params.append('Name', productParams.searchTerm)
    }

    if (productParams.orderBy !== '') {
      params = params.append('OrderBy', productParams.orderBy)
    }

    return this.client.get<PaginationResponse<IProduct[]>>(
      `${this.BASE_URL}/v1/products`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  addProduct(product: any): Observable<IProduct> {
    return this.client.post<IProduct>(`${this.BASE_URL}/v1/products`, product)
  }

  getProduct(id: string): Observable<IProduct> {
    return this.client.get<IProduct>(`${this.BASE_URL}/v1/products/${id}`)
  }

  addProductImages(id: string, media: FormData): Observable<IProduct> {
    return this.client.post<IProduct>(`${this.BASE_URL}/v1/products/${id}/images`, media)
  }

  updateProductImage(id: string, media: FormData): Observable<IProduct> {
    return this.client.put<IProduct>(`${this.BASE_URL}/v1/products/${id}/images`, media)
  }
}
