import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { PostList } from 'src/models/Posts';
import { Table } from 'src/models/Table';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit {

  data: PostList[] = [];
  isLoadingResults = true;

  table: Table;
  dataSource: any;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getPostByCategory(this.route.snapshot.params['id']);
  }

  applyFilter($event) {
    //console.log($event);
    //console.log($event.key);
    //this.dataSource.filter = $event.target.value.trim().toLowerCase(); // Libary 

    this.table.dataSource = this.data;
    this.table.dataSource = this.table.dataSource.filter(item => item.PostTitle.toLowerCase().indexOf($event.target.value.trim().toLowerCase()) > -1);
    console.log(this.table.dataSource);
    
    // if ($event.target.value != '') {
    //   //this.table.dataSource = this.data;
    //   this.table.dataSource = this.table.dataSource.filter(item => item.PostTitle.toLowerCase().indexOf($event.target.value.trim().toLowerCase()) > -1);
    //   console.log(this.table.dataSource);
    // }
    // else {
    //   //console.log("all data ");
    //   console.log(this.data);
    //   this.table.dataSource = this.data;
    // }
    // if (($event.key == 'Backspace' || $event.key == 'Delete') && $event.target.value != '') {
    //   //console.log("Delete Key");

    //   this.table.dataSource = this.data;
    //   this.table.dataSource = this.table.dataSource.filter(item => item.PostTitle.toLowerCase().indexOf($event.target.value.trim().toLowerCase()) > -1);
    //   console.log(this.table.dataSource);
    // }
  }

  getPostByCategory(Id) {
    this.api.getListPostByCategory(Id)
      .subscribe(data => {
        this.data = data;
        this.table = new Table();
        this.table.dataSource = data;
        this.table.displayedColumns = ['Id', 'Title', 'Description']
        this.dataSource = new MatTableDataSource(this.data);
        //console.log(this.data);
        this.isLoadingResults = false;
      });
  }

}
