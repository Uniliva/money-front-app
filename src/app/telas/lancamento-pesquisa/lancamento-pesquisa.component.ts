import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  colunas: string[] = ['pessoa', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'acoes'];
  datasource = new MatTableDataSource(dados);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.datasource.paginator = this.paginator;
  }

}

const dados = [
  {
    tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2017, 5, 30),
    dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'
  },
  {
    tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2017, 5, 10),
    dataPagamento: new Date(2017, 5, 30), valor: 80000, pessoa: 'Atacado Brasil'
  },
  {
    tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2017, 6, 20),
    dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda'
  },
  {
    tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: new Date(2017, 5, 5),
    dataPagamento: new Date(2017, 4, 30), valor: 800, pessoa: 'Escola Abelha Rainha'
  },
  {
    tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2017, 7, 18),
    dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza'
  },
  {
    tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2017, 6, 10),
    dataPagamento: new Date(2017, 6, 9), valor: 1750, pessoa: 'Casa Nova Imóveis'
  },
  {
    tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2017, 6, 13),
    dataPagamento: null, valor: 180, pessoa: 'Academia Top'
  }
];