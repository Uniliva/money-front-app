import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../componentes/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  notificarSucesso(msg: string) {
    this._snackBar.openFromComponent(ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        msg: msg,
        error: false
      }
    });
  }

  notificarErro(erro: any) {

    let msg: string;

    if (typeof (erro) === 'string') {
      msg = erro.toString();
    } else if (erro.error?.msgUsuario) {
      msg = erro.error.msgUsuario;
    } else {
      msg = 'Ocorreu ao consultar serviço remoto. Tente novamente'
    }

    this._snackBar.openFromComponent(ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        msg: msg,
        error: true
      }
    });
  }
}
