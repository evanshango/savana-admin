import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {map, Observable, of, ReplaySubject} from "rxjs";
import {ISignin} from "../shared/interfaces/signin";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TOKEN_KEY} from "../shared/common";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BASE_URL = environment.baseUrl
  private userSource = new ReplaySubject<ISignin>(1)
  userSource$ = this.userSource.asObservable()

  constructor(private client: HttpClient, private router: Router) {
  }

  signInUser(req: any): Observable<void> {
    return this.client.post<ISignin>(`${this.BASE_URL}/v1/auth/signin`, req).pipe(map(res => {
        if (res) {
          sessionStorage.setItem(TOKEN_KEY, res.token)
          this.userSource.next(res)
        }
      })
    )
  }

  getCurrentUser(token: string | null): Observable<any> {
    if (token) {
      let decodedToken: any = JSON.parse(atob(token.split('.')[1]))
      this.userSource.next({name: decodedToken['given_name'], email: decodedToken['email'], token: token})
    } else {
      this.userSource.next(null)
    }
    return of(this.userSource)
  }

  async signOutUser(path: string): Promise<void> {
    sessionStorage.clear()
    this.userSource.next(null as any)
    await this.router.navigateByUrl(path)
  }
}
