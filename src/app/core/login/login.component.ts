import { Router } from "@angular/router";
import { UtilsService } from "src/app/core/services/utils.service";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  usuarioInvalido = false;
  msgError: string;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _utils: UtilsService,
    private _rota: Router
  ) {}

  ngOnInit(): void {
    if (this._auth.estaLogado()) {
      this._rota.navigate(["lancamentos"]);
    }

    this.formularioLogin = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  logar() {
    this._auth.logar(this.formularioLogin.value).subscribe(
      token => this._rota.navigate(["lancamentos"]),
      erro => {
        this.formularioLogin.reset();
        this.usuarioInvalido = true;
        this.msgError = erro.error.error_description;
      }
    );
  }
}
