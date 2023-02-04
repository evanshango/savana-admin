import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AccountService} from "../../account/account.service";
import {ISignin} from "../../shared/interfaces/signin";
import {TOKEN_KEY} from "../../shared/common";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.userSource$.pipe(map((res: ISignin) => {
        if (res) {
          sessionStorage.setItem(TOKEN_KEY, res.token)
          return true
        }
        sessionStorage.removeItem(TOKEN_KEY)
        this.router.navigate(['account/signin'], {queryParams: {return_url: state.url}}).then()
        return false
      })
    );
  }
}
