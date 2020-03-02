import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ModalConfirmacaoComponent } from './componentes/modal-confirmacao/modal-confirmacao.component';
import { ToastComponent } from './componentes/toast/toast.component';



@NgModule({
  declarations: [NavbarComponent, ModalConfirmacaoComponent, ToastComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [NavbarComponent, ModalConfirmacaoComponent]
})
export class CoreModule { }
