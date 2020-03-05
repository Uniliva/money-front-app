import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { FiltroLancamento } from 'src/app/shared/models/filtro-lancamento';
import { NotificacaoService } from 'src/app/core/services/notificacao.service';
import { ModalConfirmacaoComponent } from 'src/app/core/componentes/modal-confirmacao/modal-confirmacao.component';
import { LancamentoService } from "./../lancamento.service";
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: "app-lancamento-pesquisa",
  templateUrl: "./lancamento-pesquisa.component.html",
  styleUrls: ["./lancamento-pesquisa.component.css"]
})
export class LancamentoPesquisaComponent implements OnInit {
  formularioPesquisa: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _lacamentoService: LancamentoService,
    public _dialog: MatDialog,
    private _notificador: NotificacaoService,
    private _rota: Router,
    private _auth: AuthService
  ) { }

  dados = [];
  datasource = new MatTableDataSource();
  usuario: any;
  permissoes: any;
  exibirAcoes = false;

  colunas: string[] = [
    "pessoa",
    "descricao",
    "dataVencimento",
    "dataPagamento",
    "valor"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.usuario = this._auth.buscaDadosUsuario();
    this.permissoes = this.usuario.permissoes;

    this.exibirAcoes = this.permissoes.lancamento.atualizacao || this.permissoes.lancamento.exclusao;
    if(this.exibirAcoes){
        this.colunas.push("acoes");
    }


    this.formularioPesquisa = this._fb.group({
      descricao: [''],
      dataVencimentoAte: [''],
      dataVencimentoDe: ['']
    });


    let filtro = this.montarFiltro();
    filtro.pagina = 0;
    filtro.tamanho = 5;

    this.buscarResumo(filtro);
    this.datasource.paginator = this.paginator;
  }

  pesquisar() {
    this.buscarResumo(this.montarFiltro());
  }

  remover(lancamento) {
    const dialogRef = this._dialog.open(ModalConfirmacaoComponent, {
      width: '350px',
      data: { titulo: 'Remover lançamento!', msg: `Deseja remover o lançamento ${lancamento.descricao} ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._lacamentoService.removerPorCodigo(lancamento.codigo)
          .subscribe(res => {
            this._notificador.notificarSucesso(`${lancamento.descricao} removido com sucesso.`);
            this.pesquisar();
          });
      }

    });
  }

  editar(codigo){
    this._rota.navigate([`lancamento/${codigo}`]);
  }

  novo(){
    this._rota.navigate(['lancamento/novo']);
  }


  private buscarResumo(filtro: FiltroLancamento) {
    this._lacamentoService.buscarResumo(filtro).subscribe(data => {
      this.datasource = new MatTableDataSource(data.content);
      this.paginator.length = data.totalElements;
      this.paginator.pageSize = data.size;
    });
  }

  private montarFiltro(): FiltroLancamento {
    let form = this.formularioPesquisa.value;
    var filtro = new FiltroLancamento();

    filtro.pagina = this.paginator.pageIndex;
    filtro.tamanho = this.paginator.pageSize;
    filtro.dataLancamentoAte = form.dataVencimentoAte;
    filtro.dataLancamentoDe = form.dataVencimentoDe;
    filtro.descricao = form.descricao;

    return filtro
  }
}
