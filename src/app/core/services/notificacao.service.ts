import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../componentes/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  notificar(tipo, msg) {
    let cor = 'warn';
    if (tipo === 'sucesso') cor = 'primary';

    this._snackBar.openFromComponent(ToastComponent, {
      duration: this.durationInSeconds * 1000,
      data: {
        msg: msg,
        cor: cor
      }
    });
  }
}
