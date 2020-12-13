import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
//import { OktaAuthService } from '@okta/okta-angular';
import { Person_EmailAddress } from './product';

const url = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(/*public oktaAuth: OktaAuthService, */private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {
    //const token = await this.oktaAuth.getAccessToken();
    console.log('<request> ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      //headers: {
      //  Authorization: `Bearer ${token}`
      //}
    });
    return (new Promise<any>((resolve: any, reject: any) => {
      result.subscribe({
        next: (rez: any) => {
          console.log('rez size:', (rez as []).length);
        },
        error: reject,
        complete: resolve
      })
    })
    );
  }

  getProducts() {
    console.log('getProducts');
    return this.request('get', `${url}/product`);
  }
  getProduct(id: number) {
    return this.request('get', `${url}/product/${id}`);
  }
  createProduct(product: Person_EmailAddress) {
    return this.request('post', `${url}/product`, product);
  }
  updateProduct(product: Person_EmailAddress) {
    return this.request('post', `${url}/product/${product.EmailAddressID}`, product);
  }
  deleteProduct(id: number) {
    return this.request('delete', `${url}/product/${id}`);
  }
}
