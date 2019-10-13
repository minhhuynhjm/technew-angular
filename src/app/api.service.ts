import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {Post, PostList} from '../models/Posts';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = 'http://technews.com/api/';
const apiGetPostLists = apiUrl + 'posts';
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
    return this.http.get<PostList[]>(apiGetPostLists)
      .pipe(
        tap(_ => console.log('fetch list posts')),
        catchError(this.handleError('getPostLists', []))
      );
  }
}
