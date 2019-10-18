import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Post } from '../../models/Posts';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {

  }

  post: Post = { PostId: 0, PostContent: '', PostModify: new Date(), PostTitle: '', PostDecription: '', Tag: '', Image: '' };
  isLoadingResults = true;


  ngOnInit() {
    this.getPost(this.route.snapshot.params['id']);
  }

  getPost(Id) {
    this.api.getPost(Id)
      .subscribe(data => {
        this.post = data;
        console.log(this.post);
        this.isLoadingResults = false;
      });
  }

}
