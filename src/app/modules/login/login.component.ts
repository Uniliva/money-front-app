import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  usuarioInvalido = false;


  constructor(
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.formularioLogin = this._fb.group({
      email: ['', [Validators.required,Validators.email]],
      senha: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  logar(){

  }

}
