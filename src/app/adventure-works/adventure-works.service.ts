import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

const url = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class AdventureWorksService {

  data: Observable<any>;

  constructor(private http: HttpClient) {
    this.data = this.http.request(
                'get', `${url}/AdventureWorks`
              , { body: undefined, responseType: 'json'
                , observe: 'body', })
                .pipe( shareReplay(1) );
  }

  getDatabaseOutline() {
    return this.data;
  }
}
