import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Post, PostList } from '../models/Posts';
const httpOptions = {
  headers: new HttpHeaders()
};
httpOptions.headers.append('Content-Type', 'application/json');
httpOptions.headers.append('Content-Type', 'multipart/form-data');
const apiUrl = 'http://technews.com/api/';//http://localhost:50718/
//const apiUrl = 'http://localhost:50718/api/';
const apiPosts = apiUrl + 'posts';
const apiPostByCategory = apiPosts + '/Categories';
const apiPaging = apiPosts + '/Category';
const apiTest = 'http://192.168.66.36/api/export';
//const apiTest = 'http://192.168.50.65/api/export';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getListPosts(): Observable<PostList[]> {
    return this.http.get<PostList[]>(apiPosts)
      .pipe(
        tap(_ => console.log('fetch list posts')),
        catchError(this.handleError('getPostLists', []))
      );
  }

  getListPostByCategory(id: number): Observable<PostList[]> {
    const url = `${apiPostByCategory}/${id}`;
    return this.http.get<PostList[]>(url)
      .pipe(
        tap(_ => console.log('fetch list posts')),
        catchError(this.handleError('getPostLists', []))
      );
  }

  getPagination(id: number, page: number): Observable<any> {
    const url = `${apiPaging}/${id}/${page}`;
    return this.http.get<any>(url)
      .pipe(
        tap(_ => console.log('fetch list posts')),
        catchError(this.handleError('getPostLists', []))
      );
  }

  getPost(id: number): Observable<Post> {
    const url = `${apiPosts}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => console.log(`fetched post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  addPost(post): Observable<any> {
    return this.http.post<any>(apiTest, post, httpOptions).pipe(
      // tap((post: Post) => console.log('added post')),
      // catchError(this.handleError<Post>('error add Post'))
    );
  }
}
