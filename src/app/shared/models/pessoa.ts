export class Pessoa {
  codigo:number;
  nome: string;
  endereco: Endereco = new Endereco();
  ativo: boolean;
}

class Endereco {
  logradouro: string;
  numero:string;
  complemento:string;
  bairro:string;
  cep:string;
  cidade: string;
  estado: string;
}
