import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Post } from 'src/models/Posts';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-post-add',
    templateUrl: './post-add.component.html',
    styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {

    postForm: FormGroup;
    post: Post;
    isLoadingResults = false;
    image: File = null;

    constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {

    }


    ngOnInit() {
        this.postForm = this.formBuilder.group({
            postTitle: ['', Validators.required],
            postContent: ['', Validators.required],
            postDecription: ['', Validators.required],
            categoryId: ['', Validators.required],
            postStatus: ['', Validators.required],
            tag: ['', Validators.required]
        });
    }

    // onFormSubmit(form: NgForm) {
    //   this.isLoadingResults = true;
    //   console.log('ddd ', form);
    //   this.api.addPost(form)
    //     .subscribe(res => {
    //       console.log('res: ', res);
    //       let id = res;
    //       this.isLoadingResults = false;
    //       // this.router.navigate(['/posts']);
    //     }, (err) => {
    //       console.log(err);
    //       this.isLoadingResults = false;
    //     });
    // }

    converFormGroupToFormData(formData: FormData){
        formData.append('PostTitle', this.postForm.get('postTitle').value);
        formData.append('FileImage', this.image);
        formData.append('PostContent', this.postForm.get('postContent').value);
        formData.append('PostDecription', this.postForm.get('postDecription').value);
        formData.append('CategoryId', this.postForm.get('categoryId').value);
        formData.append('PostStatus', this.postForm.get('postStatus').value);
        formData.append('Tag', this.postForm.get('tag').value);
    }


    // Non Function Formdata
    onFormSubmit() {
        const formData = new FormData();
        this.converFormGroupToFormData(formData);

        this.isLoadingResults = true;
        this.api.addPost(formData)
            .subscribe(res => {
                console.log('res: ', res);
                this.isLoadingResults = false;
                this.router.navigate(['/posts']);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }
    handleFileInput(files: FileList) {
        this.image = files[0];
    }

}
