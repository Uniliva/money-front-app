import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LancamentoPesquisaComponent } from './modules/lancamento/lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './modules/lancamento/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from './modules/pessoa/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './modules/pessoa/pessoa-cadastro/pessoa-cadastro.component';


const routes: Routes = [
  { path: 'lancamentos', component: LancamentoPesquisaComponent },
  { path: 'lancamento/novo', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PessoaPesquisaComponent },
  { path: 'pessoa/nova', component: PessoaCadastroComponent },
  { path: 'pessoa/:id', component: PessoaCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
