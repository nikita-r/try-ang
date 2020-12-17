import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { AdventureWorksComponent } from './adventure-works/adventure-works.component';

//import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { CallbackPipe } from './util/callback.pipe';
import { AWTableComponent } from './aw-table/aw-table.component';


import {
  OKTA_CONFIG,
  OktaAuthModule
} from '@okta/okta-angular';

const oktaConfig = {
  issuer: 'https://dev-6008901.okta.com/oauth2/default',
  clientId: '0oa27pcpvMnlYOj4g5d6',
  redirectUri: window.location.origin + '/implicit/callback'
}


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    PageComponent,
    AdventureWorksComponent,
    CallbackPipe,
    AWTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    //MatAccordion, MatExpansionPanel

    OktaAuthModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
