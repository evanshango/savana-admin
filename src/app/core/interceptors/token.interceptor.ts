import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse,
} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {TOKEN_KEY} from "../../shared/common";
import {PaginationResponse} from "../../shared/models/pagination-response";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem(TOKEN_KEY)
    if (token) {
      request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    }
    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.headers.get('pagination')) {
            event = event.clone({body: this._modifyBody(event)})
          }
        }
        return event
      })
    )
  }

  private _modifyBody(event: HttpResponse<any>): PaginationResponse<any> {
    const pagination = event.headers.get('pagination')
    let paginationResponse: PaginationResponse<any> = new PaginationResponse<any>()
    if (pagination) {
      paginationResponse = new PaginationResponse(JSON.parse(pagination), event.body)
    }
    return paginationResponse
  }
}
