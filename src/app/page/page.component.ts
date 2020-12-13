import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data;
  }

}
