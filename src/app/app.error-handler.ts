import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable'
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";

import 'rxjs/add/observable/throw'
import { NotificationService } from "./shared/messages/notification.service";
import { LoginService } from "./security/login/login.service";

//Classse para tratar erro utilizando metodo catch => assistir aula 44 novamente 
//foi passado na aula que o tratamento catch pode fazer um tratamento basico direto na camada de serviços e mostrar uam mensagem para usuario caso ocorra algum erro 
//uma boa pratica 
@Injectable()

export class ApplicationErrorHandler extends ErrorHandler{
    
    constructor(private ns: NotificationService, private injector: Injector, private zone: NgZone){
        super()

    }

    handleError(errorResponse: HttpErrorResponse | any){
        if(errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.error.message
            this.zone.run(()=>{
                switch(errorResponse.status){                
                case 401:
                this.injector.get(LoginService).handleLogin()
                break;
                case 403:
                this.ns.notify(message || 'não autorizado.' )
                break;
                case 404:
                this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes')
                break;
            }

            })
            

        }
        super.handleError(errorResponse)

       
        
    }
}