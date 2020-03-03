export class Pessoa {
  nome: string;
  endereco: Endereco;
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
