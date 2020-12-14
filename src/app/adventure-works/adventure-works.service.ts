import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class AdventureWorksService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {
    console.log(`<${method} request> ` + JSON.stringify(data));
    return this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
    });
  }

  getDatabaseOutline() {
    console.log('getDatabaseOutline');
    return this.request('get', `${url}/AdventureWorks`)
  }
}
