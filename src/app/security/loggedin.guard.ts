import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggeInGuard implements CanLoad, CanActivate{

    constructor(private loginService: LoginService){}

    checkAuthentication(path: string): boolean{
        const loggeIn= this.loginService.isLoggedIn()
        if(!loggeIn){
            this.loginService.handleLogin(`/${path}`)
        }
        return loggeIn
    }

    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState:RouterStateSnapshot ): boolean{
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }
}