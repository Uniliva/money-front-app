import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/entidades/lancamento';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  lancamento = new Lancamento();

  categorias = ['Compra', 'Venda', 'Aluguel'];

  pessoas = [
    { nome: 'Manoel Pinheiro', cidade: 'Uberlândia', estado: 'MG', ativo: true },
    { nome: 'Sebastião da Silva', cidade: 'São Paulo', estado: 'SP', ativo: false },
    { nome: 'Carla Souza', cidade: 'Florianópolis', estado: 'SC', ativo: true },
    { nome: 'Luís Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
    { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
    { nome: 'Paula Maria', cidade: 'Uberlândia', estado: 'MG', ativo: true }
  ]

  constructor() { }



  ngOnInit(): void {

    // inicializando objeto
    this.lancamento.tipo = 'Receita';
  }


  salvar() {

  }

  log(item:any){
    console.log(item);

  }
}
