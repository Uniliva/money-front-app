import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.formularioLogin = this._fb.group({
      nome: [''],
      senha: ['']
    });
  }

}
