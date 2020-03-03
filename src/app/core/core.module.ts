import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ModalConfirmacaoComponent } from './componentes/modal-confirmacao/modal-confirmacao.component';
import { ToastComponent } from './componentes/toast/toast.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavbarComponent, ModalConfirmacaoComponent, ToastComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [NavbarComponent, ModalConfirmacaoComponent]
})
export class CoreModule { }
