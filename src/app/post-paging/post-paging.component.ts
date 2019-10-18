import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { PostList } from 'src/models/Posts';
import {PageEvent} from '@angular/material/paginator';
import { Table } from 'src/models/Table';

@Component({
  selector: 'app-post-paging',
  templateUrl: './post-paging.component.html',
  styleUrls: ['./post-paging.component.scss']
})
export class PostPagingComponent implements OnInit {

  data: any = [];
  page: number;
  pageEvent: PageEvent;
  length = 100;
  pageSize = 5;
  id: number;
  pageSizeOptions: number[] = [5];

  table: Table;
  
  
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.table = new Table();
    this.id = this.route.snapshot.params['id'];
    this.getPagination(this.id, 1);
  }

  getPagination(Id, page) {
    this.api.getPagination(Id, page)
      .subscribe(data => {
        this.data = data;
        this.length = data.totalRows;
        console.log(this.data, this.length);
        this.table.dataSource = this.data.listPosts;
        this.table.displayedColumns = ['Id', 'Title', 'Description']
        //this.isLoadingResults = false;
      });
  }
  FetchData(event?: PageEvent){
    this.getPagination(this.id, event.pageIndex + 1)
  }
}
