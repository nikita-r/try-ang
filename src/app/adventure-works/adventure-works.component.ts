import { Component, OnInit } from '@angular/core';
//import { Connection } from 'mssql';
import { AdventureWorksService } from './adventure-works.service';

@Component({
  selector: 'app-adventure-works',
  templateUrl: './adventure-works.component.html',
  styleUrls: ['./adventure-works.component.css']
})
export class AdventureWorksComponent implements OnInit {

  //sql: any;
  //sql_config: any;
  //cnxn: Connection;

  records = [];
  dathier: { [schema: string]: { [type: string]: string[] } } = {};
  schemas = [];

  isWiP = false;

  constructor(public awsvc: AdventureWorksService) {
  /*
    this.sql = require('mssql');

    const port = 65496;
    //this.sql_config = { server: 'localhost', port: port, user: 'usr', password: 'pwd', database: 'AdventureWorks' };
    //this.sql_config = `Data Source=localhost,${port};User ID=usr;Password=pwd;Initial Catalog=AdventureWorks`;
    this.sql_config = `mssql://usr:pwd@localhost:${port}/AdventureWorks`;
  */
  }

  async refresh() {
    this.isWiP = true;
    try {
      const incoming = await this.awsvc.getDatabaseOutline();
      incoming.subscribe({
        next: (rez: any) => {
          //console.log('rez type:', typeof rez);
          //console.log('rez size:', (rez as []).length);
          this.records = rez as [];
          this.dathier = {};
          this.schemas = [];
          this.records.forEach(el => {
            if (!(el['schema'] in this.dathier)) { this.dathier[el['schema']] = {}; this.schemas.push(el['schema']); }
            if (!(el['type'] in this.dathier[el['schema']])) { this.dathier[el['schema']][el['type']] = []; }
            this.dathier[el['schema']][el['type']].push(el['name']);
          });
          this.isWiP = false;
        },
        error: (err)=>{ console.log(err); this.isWiP = false; },
        complete: ()=>{ console.log('incoming complete'); this.isWiP = false; }
      });
    } catch (err) {
      console.log('failed await getDatabaseOutline:', err);
    }
  }

  ngOnInit(): void {
    //let cnxn = this.sql.connect(this.sql_config);
    this.refresh();
  }

}
