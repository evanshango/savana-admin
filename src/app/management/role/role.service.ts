import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RoleParams} from "../../shared/models/role-params";
import {map, Observable} from "rxjs";
import {PaginationResponse} from "../../shared/models/pagination-response";
import {IRole} from "../../shared/interfaces/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  BASE_URL: string = environment.baseUrl

  constructor(private client: HttpClient) {
  }

  getPaginatedRoles(roleParams: RoleParams): Observable<PaginationResponse<IRole[]>> {
    let params = new HttpParams()
    params = params.append('Page', roleParams.page)
    params = params.append('PageSize', roleParams.pageSize)

    if (roleParams.enabled !== undefined) {
      params = params.append('Enabled', roleParams.enabled)
    }

    if (roleParams.name !== '') {
      params = params.append('Name', roleParams.name)
    }

    return this.client.get<PaginationResponse<IRole[]>>(
      `${this.BASE_URL}/v1/roles`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  getUnPaginatedRoles(roleParams: RoleParams): Observable<IRole[]> {
    let params = new HttpParams()

    if (roleParams.paginated != undefined){
      params = params.append('Paginated', roleParams.paginated)
    }

    return this.client.get<IRole[]>(
      `${this.BASE_URL}/v1/roles`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  addRole(role: any): Observable<IRole> {
    return this.client.post<IRole>(`${this.BASE_URL}/v1/roles`, role)
  }

  updateRole(role: any, roleId: string): Observable<IRole> {
    return this.client.put<IRole>(`${this.BASE_URL}/v1/roles/${roleId}`, role)
  }
}
