import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { AdventureWorksComponent } from './adventure-works/adventure-works.component';
import { AWTableComponent } from './aw-table/aw-table.component';

import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Page-A', data: { letter: 'A', animation: 'A' },
    component: PageComponent
  },
  {
    path: 'Page-B', data: { letter: 'B', animation: 'B' },
    component: PageComponent
  },
  {
    path: 'Page-C', data: { letter: 'C', animation: 'C' },
    component: PageComponent
  },
  {
    path: 'AdventureWorks',
    component: AdventureWorksComponent
  },
  {
    path: 'AdventureWorks/table/:table',
    component: AWTableComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
