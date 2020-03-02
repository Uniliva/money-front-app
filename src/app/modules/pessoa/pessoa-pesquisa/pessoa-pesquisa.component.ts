import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PessoaService } from '../pessoa.service';


@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  constructor(private fb: FormBuilder, private pessoaService: PessoaService) { }

  formularioPessoaPesquisa: FormGroup;
  dados: any;
  colunas: string[] = ['nome', 'cidade', 'estado', 'ativo', 'acoes'];

  datasource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.formularioPessoaPesquisa = this.fb.group({
      nome: ['']
    })

    this.pessoaService.buscaTodos()
      .subscribe((data: any) => {
        this.datasource = new MatTableDataSource(data);
        this.datasource.paginator = this.paginator;
      },
        error => console.log("Ocorreu um erro ao listar pessoas"));
  }

  aplicarFiltror(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}

