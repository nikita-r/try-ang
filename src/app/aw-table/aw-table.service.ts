import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';

//const CREATE_ACTION = 'create';
//const UPDATE_ACTION = 'update';
//const REMOVE_ACTION = 'destroy';
const CREATE_ACTION = 'POST';
const UPDATE_ACTION = 'POST';
const REMOVE_ACTION = 'DELETE';

const url = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class AWTableService extends BehaviorSubject<any[]> {
  constructor(private http: HttpClient) {
    super([]);
  }

  private request(table: string, method: string, id?: number, data?: any) {
    return this.http.request(
                            //method, id ? `${url}/AdventureWorks/table/${table}/${id}` : `${url}/AdventureWorks/table/${table}`
                              method, id ? `${url}/product/${id}` : `${url}/product`
                            , { body: data, responseType: 'json'
                              , observe: 'body', })
                            //.pipe( shareReplay(1) )
                            .pipe(map(rez => <any[]>rez));
  }

  private data: any[] = [];

  private reset() {
    this.data = [];
  }

  public read(table: string) {
    if (this.data.length) {
      return super.next(this.data);
    }

    this.request(table, 'get')
        .pipe(
            tap(data => {
                this.data = data;
            })
        )
        .subscribe({
          next: data => { super.next(data); },
          error: (err)=>{console.log(err)},
          complete: ()=>{},
        });
  }

  public save(table: string, id: number, data: any, isNew?: boolean) {
    const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

    this.reset();

    this.request(table, action, isNew ? undefined : id, data)
        .subscribe({
          next: () => this.read(table),
          error: (err)=>{ console.log(err); this.read(table) },
          complete: () => this.read(table),
        });
  }

  public remove(table: string, id: number, data: any) {
    this.reset();

    this.request(table, REMOVE_ACTION, id, data)
        .subscribe({
          next: () => this.read(table),
          error: (err)=>{ console.log(err); this.read(table) },
          complete: () => this.read(table),
        });
  }

  public resetItem(dataItem: any) {
    if (!dataItem) { return; }

    // find orignal data item
    const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);

    // revert changes
    Object.assign(originalDataItem, dataItem);

    super.next(this.data);
  }
}
