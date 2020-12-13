import { Component, OnInit } from '@angular/core';
//import { Connection } from 'mssql';

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

  constructor() {
  /*
    this.sql = require('mssql');

    const port = 65496;
    //this.sql_config = { server: 'localhost', port: port, user: 'usr', password: 'pwd', database: 'AdventureWorks' };
    //this.sql_config = `Data Source=localhost,${port};User ID=usr;Password=pwd;Initial Catalog=AdventureWorks`;
    this.sql_config = `mssql://usr:pwd@localhost:${port}/AdventureWorks`;
  */
  }

  ngOnInit(): void {
    //let cnxn = this.sql.connect(this.sql_config);
  }

}
