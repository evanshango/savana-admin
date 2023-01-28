import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserParams} from "../../shared/models/user-params";
import {map, Observable} from "rxjs";
import {PaginationResponse} from "../../shared/models/pagination-response";
import {IUser} from "../../shared/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  BASE_URL = environment.baseUrl

  constructor(private client: HttpClient) {
  }

  getMembers(userParams: UserParams, slug?: string): Observable<PaginationResponse<IUser[]>> {
    let params = new HttpParams()
    params = params.append('Page', userParams.page)
    params = params.append('PageSize', userParams.pageSize)

    if (userParams.enabled !== undefined) {
      params = params.append('Enabled', userParams.enabled)
    }

    if (userParams.name !== '') {
      params = params.append('Name', userParams.name)
    }

    if (userParams.orderBy !== '') {
      params = params.append('OrderBy', userParams.orderBy)
    }

    if (slug) {
      return this.client.get<PaginationResponse<IUser[]>>(
        `${this.BASE_URL}/v1/groups/${slug}/members`, {observe: 'response', params}
      ).pipe(map(response => response.body))
    }
    return this.client.get<PaginationResponse<IUser[]>>(
      `${this.BASE_URL}/v1/users`, {observe: 'response', params}
    ).pipe(map(response => response.body))
  }

  getMemberById(userId: string): Observable<IUser> {
    return this.client.get<IUser>(`${this.BASE_URL}/v1/users/${userId}`)
  }

  updateMemberGroups(userId: string, groups: any): Observable<IUser>{
    return this.client.put<IUser>(`${this.BASE_URL}/v1/users/${userId}/groups`, groups)
  }
}
