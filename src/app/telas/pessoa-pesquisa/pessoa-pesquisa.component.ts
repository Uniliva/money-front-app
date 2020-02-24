import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent  implements OnInit {

  colunas: string[] = ['nome', 'cidade', 'estado', 'ativo', 'acoes'];
  datasource = new MatTableDataSource(dados);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.datasource.paginator = this.paginator;
  }

}

const dados = [
  { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
  { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false },
  { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true },
  { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
  { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
  { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', ativo: true }
];
