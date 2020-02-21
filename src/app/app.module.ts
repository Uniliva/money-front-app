import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularModulesModule } from './angular-modules/angular-modules.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularModulesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
