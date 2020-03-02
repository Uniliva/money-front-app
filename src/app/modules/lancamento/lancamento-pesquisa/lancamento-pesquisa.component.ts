import { LancamentoService } from "./../lancamento.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";

import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FiltroLancamento } from 'src/app/shared/models/filtro-lancamento';

@Component({
  selector: "app-lancamento-pesquisa",
  templateUrl: "./lancamento-pesquisa.component.html",
  styleUrls: ["./lancamento-pesquisa.component.css"]
})
export class LancamentoPesquisaComponent implements OnInit {
  formularioPesquisa: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _lacamentoService: LancamentoService
  ) {}

  dados = [];
  datasource = new MatTableDataSource();

  colunas: string[] = [
    "pessoa",
    "descricao",
    "dataVencimento",
    "dataPagamento",
    "valor",
    "acoes"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.formularioPesquisa = this.fb.group({
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

  pesquisar(){
    this.buscarResumo(this.montarFiltro());
  }

  private buscarResumo(filtro:FiltroLancamento) {
    this._lacamentoService.buscarResumo(filtro).subscribe(data => {
      this.datasource = new MatTableDataSource(data.content);
      this.paginator.length = data.totalElements;
      this.paginator.pageSize = data.size;
    });
  }

  private montarFiltro() : FiltroLancamento {
    let form = this.formularioPesquisa.value;
    var filtro = new FiltroLancamento();

    filtro.pagina = this.paginator.pageIndex;
    filtro.tamanho = this.paginator.pageSize;
    filtro.dataLancamentoAte = form.dataVencimentoAte;
    filtro.dataLancamentoDe =  form.dataVencimentoDe;
    filtro.descricao =  form.descricao;

    return filtro
  }
}
