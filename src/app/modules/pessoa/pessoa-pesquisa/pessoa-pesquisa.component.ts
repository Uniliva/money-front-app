import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacaoComponent } from 'src/app/core/componentes/modal-confirmacao/modal-confirmacao.component';
import { Pessoa } from 'src/app/shared/models/pessoa';
import { NotificacaoService } from 'src/app/core/services/notificacao.service';


@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  constructor(private fb: FormBuilder, private pessoaService: PessoaService, public dialog: MatDialog, private notificador : NotificacaoService) { }

  formularioPessoaPesquisa: FormGroup;
  dados: any;
  colunas: string[] = ['nome', 'cidade', 'estado', 'ativo', 'acoes'];

  datasource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.formularioPessoaPesquisa = this.fb.group({
      nome: ['']
    })
    this.listarPessoas();
  }

  aplicarFiltror(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  remover(pessoa){
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      width: '350px',
      data: {titulo: 'Remover pessoa!', msg: `Deseja remover ${pessoa.nome} ?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pessoaService.removerPorCodigo(pessoa.codigo)
        .subscribe( res => {
          this.notificador.notificar('sucesso',`${pessoa.nome} removido com sucesso.`);
          this.listarPessoas();
        },
          error =>  this.notificador.notificar('erro', `Erro ao apagar ${pessoa.nome}`)
        );
      }

    });
  }

  listarPessoas(){
    this.pessoaService.buscaTodos()
      .subscribe((data: any) => {
        this.datasource = new MatTableDataSource(data);
        this.datasource.paginator = this.paginator;
      },
        error => console.log("Ocorreu um erro ao listar pessoas"));
  }

}

