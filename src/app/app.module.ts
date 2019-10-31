import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostAddComponent } from './post-add/post-add.component';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PostTableComponent } from './post-table/post-table.component';
import { PostPagingComponent } from './post-paging/post-paging.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HotTableModule } from '@handsontable/angular';
import * as Handsontable from 'handsontable';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostDetailComponent,
    PostAddComponent,
    PostTableComponent,
    PostPagingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    EditorModule,
    MatPaginatorModule,
    HotTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
