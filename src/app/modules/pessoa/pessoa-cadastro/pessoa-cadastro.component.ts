import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-pessoa-cadastro",
  templateUrl: "./pessoa-cadastro.component.html",
  styleUrls: ["./pessoa-cadastro.component.css"]
})
export class PessoaCadastroComponent implements OnInit {
  formularioPessoa: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioPessoa = this.fb.group({
      nome: [null, [Validators.minLength(10), Validators.required]],
      logradouro: [null, [Validators.minLength(5), Validators.required]],
      numero: [null, Validators.required],
      complemento: [null, null],
      bairro: [null, Validators.required],
      cep: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  salvar() {}
}
