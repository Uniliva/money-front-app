import { LancamentoService } from './../lancamento.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";

import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-lancamento-pesquisa",
  templateUrl: "./lancamento-pesquisa.component.html",
  styleUrls: ["./lancamento-pesquisa.component.css"]
})
export class LancamentoPesquisaComponent implements OnInit {
  formularioPesquisa: FormGroup;

  constructor(private fb: FormBuilder, private _lacamentoService : LancamentoService) {}

  dados = [];

  colunas: string[] = [
    "pessoa",
    "descricao",
    "dataVencimento",
    "dataPagamento",
    "valor",
    "acoes"
  ];
  datasource = new MatTableDataSource(this.dados);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.formularioPesquisa = this.fb.group({
      descricao: [null, null],
      dataVenciemntoDe: [null, null],
      dataVenciemntoAte: [null, null]
    });

    this.datasource.paginator = this.paginator;

    this._lacamentoService.buscarResumo()
    .subscribe(
      (data) => this.dados = data['content'],
      (error) => `Erro ao buscar resumo dos lançamentos`
   )
  }
}


