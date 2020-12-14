import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aw-table',
  templateUrl: './aw-table.component.html',
  styleUrls: ['./aw-table.component.css']
})
export class AWTableComponent implements OnInit {

  table_name: string;

  constructor(private route: ActivatedRoute) {
    this.table_name = '?';
    this.route.params.subscribe( params => this.table_name = params['table'] );
  }

  ngOnInit(): void {
  }

}
