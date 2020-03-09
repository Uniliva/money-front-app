import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { LancamentoModule } from './modules/lancamento/lancamento.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LancamentoModule,
    SharedModule,
    PessoaModule,
    CoreModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("access_token");
        },
      whitelistedDomains: ['localhost:8090'],
      blacklistedRoutes: ['/oauth/token']
      }
    })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule {}
