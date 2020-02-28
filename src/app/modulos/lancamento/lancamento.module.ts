import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import localePt from '@angular/common/locales/pt';
import { NgxCurrencyModule } from 'ngx-currency';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { MaterialModule } from 'src/app/material/material.module';

registerLocaleData(localePt, 'pt-BR');

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true
};

@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],
  imports: [
    CommonModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class LancamentoModule { }
