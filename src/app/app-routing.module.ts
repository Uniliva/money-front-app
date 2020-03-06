import { LoginComponent } from './core/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LancamentoPesquisaComponent } from './modules/lancamento/lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './modules/lancamento/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from './modules/pessoa/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './modules/pessoa/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/componentes/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'lancamentos', component: LancamentoPesquisaComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] } },
  { path: 'lancamento/novo', component: LancamentoCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] } },
  { path: 'lancamento/:id', component: LancamentoCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ATUALIZAR_LANCAMENTO'] } },
  { path: 'pessoas', component: PessoaPesquisaComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_PESQUISAR_PESSOA'] } },
  { path: 'pessoa/nova', component: PessoaCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_CADASTRAR_PESSOA'] } },
  { path: 'pessoa/:id', component: PessoaCadastroComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ATUALIZAR_PESSOA'] } },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
