import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import {Post, PostList} from '../../models/Posts';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() numberCount: string ='';
  
  displayedColumns: string[] = ['Title','Modify','Description'];
  data: PostList[] = [];
  rowCount: any;
  isLoadingResults = true;
  constructor(private api: ApiService) { }


  ngOnInit() {
    console.log(this.numberCount);

    this.api.getListPosts()
    .subscribe(res => {
      this.data = res;
      this.rowCount = this.data.length % 4 === 0 ? Math.floor(this.data.length / 4) : Math.floor(this.data.length / 4) + 1;
      this.rowCount = Array.apply(null, {length: this.rowCount}).map(Number.call, Number)
      console.log(this.data.length);
      console.log(this.rowCount);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
