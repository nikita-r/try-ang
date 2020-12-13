import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from './products.service';
import { Person_EmailAddress } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['EmailAddressID', 'EmailAddress', 'ModifiedDate'];
  dataSource = new MatTableDataSource<any>();

  selectedProduct = {} as Person_EmailAddress; // FIXME
  isWiP = false;

  constructor(public productService: ProductsService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  async refresh() {
    this.isWiP = true;
    console.log('before getProducts');
    try {
      const data = await this.productService.getProducts();
      this.dataSource.data = data;
    } catch (err) {
      console.log(err);
    }
    console.log('after getProducts');
    this.isWiP = false;
  }

  async updateProduct() {
    if (this.selectedProduct.EmailAddressID !== undefined) {
      await this.productService.updateProduct(this.selectedProduct);
    } else {
      await this.productService.createProduct(this.selectedProduct);
    }
    this.selectedProduct = {} as Person_EmailAddress; // FIXME
    await this.refresh();
  }

  editProduct(product: Person_EmailAddress) {
    this.selectedProduct = product;
  }

  clearProduct() {
    this.selectedProduct = {} as Person_EmailAddress; // FIXME
  }

  async deleteProduct(product: Person_EmailAddress) {
    this.isWiP = true;
    if (confirm(`Are you sure you want to delete "${product.EmailAddress}" from the db?  Such action cannot be undone.`)) {
      this.productService.deleteProduct(product.EmailAddressID);
    }
    await this.refresh();
  }
}
