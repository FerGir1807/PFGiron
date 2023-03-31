import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from './toolbar/toolbar.module';
import { InicioComponent } from './inicio/components/inicio/inicio.component';
import { InicioModule } from './inicio/inicio.module';
import { RegistroCorrectoComponent } from './shared/components/registro-correcto/registro-correcto.component';
import { SharedModule } from './shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroCorrectoComponent,
    NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    InicioModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSidenavModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDividerModule
  ],
  exports: [
    MatSidenavModule,
    MatRadioModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
