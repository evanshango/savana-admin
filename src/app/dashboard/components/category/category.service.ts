import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map, Observable} from "rxjs";
import {PaginationResponse} from "../../../shared/models/pagination-response";
import {CategoryParams} from "../../../shared/models/category-params";
import {ICategory} from "../../../shared/interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  BASE_URL: string = environment.baseUrl

  constructor(private client: HttpClient) { }

  getCategories(categoryParams: CategoryParams): Observable<PaginationResponse<ICategory[]>> {
    let params = new HttpParams()
    params = params.append('Page', categoryParams.page)
    params = params.append('PageSize', categoryParams.pageSize)

    if (categoryParams.enabled !== undefined) {
      params = params.append('Enabled', categoryParams.enabled)
    }

    if (categoryParams.name !== '') {
      params = params.append('Name', categoryParams.name)
    }

    if (categoryParams.orderBy !== '') {
      params = params.append('OrderBy', categoryParams.orderBy)
    }

    return this.client.get<PaginationResponse<ICategory[]>>(
      `${this.BASE_URL}/v1/categories`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  addCategory(category: any): Observable<ICategory> {
    return this.client.post<ICategory>(`${this.BASE_URL}/v1/categories`, category)
  }
}
