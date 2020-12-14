import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
//import { Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Person_EmailAddress } from '../products/product';
import { AWTableService } from './aw-table.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-aw-table',
  templateUrl: './aw-table.component.html',
  styleUrls: ['./aw-table.component.css']
})
export class AWTableComponent implements OnInit {

  table_name: string;

  public view: Observable<GridDataResult>;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public formGroup: FormGroup;

  //private editService: AWTableService;
  private editedRowIndex: number;

  constructor(private route: ActivatedRoute, private editService: AWTableService) {
    this.table_name = '?';
    this.route.params.subscribe( params => this.table_name = params['table'] );

    this.editedRowIndex = 0;
    this.formGroup = new FormGroup({});

    //this.editService = editServiceFactory();
    this.view = this.editService.pipe(map(data => process(data, this.gridState)));
    this.editService.read(this.table_name);
  }

  ngOnInit(): void {
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.editService.read(this.table_name);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'EmailAddressID': new FormControl(0),
      'EmailAddress': new FormControl('', Validators.required),
      'ModifiedDate': new FormControl(),
    });

    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'EmailAddressID': new FormControl(dataItem.EmailAddressID),
      'EmailAddress': new FormControl(dataItem.EmailAddress, Validators.required),
      'ModifiedDate': new FormControl(dataItem.ModifiedDate),
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    const product: Person_EmailAddress = formGroup.value;

    this.editService.save(this.table_name, product.EmailAddressID, product, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.editService.remove(this.table_name, dataItem.EmailAddressID, dataItem);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = 0;
    this.formGroup = new FormGroup({});
  }
}
