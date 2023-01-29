import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GroupParams} from "../../../../shared/models/group-params";
import {map, Observable} from "rxjs";
import {PaginationResponse} from "../../../../shared/models/pagination-response";
import {IGroup} from "../../../../shared/interfaces/group";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  BASE_URL: string = environment.baseUrl

  constructor(private client: HttpClient) {
  }

  getGroups(groupParams: GroupParams): Observable<PaginationResponse<IGroup[]>> {
    let params = new HttpParams()
    params = params.append('Page', groupParams.page)
    params = params.append('PageSize', groupParams.pageSize)

    if (groupParams.enabled !== undefined) {
      params = params.append('Enabled', groupParams.enabled)
    }

    if (groupParams.name !== '') {
      params = params.append('Name', groupParams.name)
    }

    if (groupParams.orderBy !== '') {
      params = params.append('OrderBy', groupParams.orderBy)
    }

    return this.client.get<PaginationResponse<IGroup[]>>(
      `${this.BASE_URL}/v1/groups`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  addGroup(group: any): Observable<IGroup>{
    return this.client.post<IGroup>(`${this.BASE_URL}/v1/groups`, group)
  }

  getGroup(groupSlug: string): Observable<IGroup>{
    return this.client.get<IGroup>(`${this.BASE_URL}/v1/groups/${groupSlug}`)
  }

  updateGroup(update: any, slug: string): Observable<IGroup> {
    return this.client.put<IGroup>(`${this.BASE_URL}/v1/groups/${slug}`, update)
  }
}
