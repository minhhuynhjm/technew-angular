import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { PostList } from 'src/models/Posts';
import { Table } from 'src/models/Table';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit {

  data: PostList[] = [];
  isLoadingResults = true;

  table: Table;



  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getPostByCategory(this.route.snapshot.params['id']);
  }

  getPostByCategory(Id) {
    this.api.getListPostByCategory(Id)
      .subscribe(data => {
        this.data = data;
        this.table = new Table();
        this.table.dataSource = data;
        this.table.displayedColumns = ['Id', 'Title', 'Description']
        console.log(this.data);
        this.isLoadingResults = false;
      });
  }

}
