import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpRequest,
} from "@angular/common/http";
import { catchError, tap, map, retry } from "rxjs/operators";
import { Post, PostList } from "../models/Posts";
const httpOptions = {
  headers: new HttpHeaders(),
};
httpOptions.headers.append("Content-Type", "application/json");
httpOptions.headers.append("Content-Type", "multipart/form-data");
const apiUrl = "http://technews.com/api/";
const apiPosts = apiUrl + "posts";
const apiPostByCategory = apiPosts + "/Categories";
const apiPaging = apiPosts + "/Category";
const apiTest = "http://192.168.66.36/api/export";
const apiAwsPut =
  "https://learningjm.s3.ap-southeast-1.amazonaws.com/hello/face.jpg?X-Amz-Expires=600&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYQ6VWBCNX3G75HFG/20200712/ap-southeast-1/s3/aws4_request&X-Amz-Date=20200712T134930Z&X-Amz-SignedHeaders=host&X-Amz-Signature=492c5e0601d5ab87d273d3019aed3dd161534e524ea457a2eaf7f9ef71355044";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getListPosts(): Observable<PostList[]> {
    return this.http.get<PostList[]>(apiPosts).pipe(
      tap((_) => console.log("fetch list posts")),
      catchError(this.handleError("getPostLists", []))
    );
  }

  getListPostByCategory(id: number): Observable<PostList[]> {
    const url = `${apiPostByCategory}/${id}`;
    return this.http.get<PostList[]>(url).pipe(
      tap((_) => console.log("fetch list posts")),
      catchError(this.handleError("getPostLists", []))
    );
  }

  getPagination(id: number, page: number): Observable<any> {
    const url = `${apiPaging}/${id}/${page}`;
    return this.http.get<any>(url).pipe(
      tap((_) => console.log("fetch list posts")),
      catchError(this.handleError("getPostLists", []))
    );
  }

  getPost(id: number): Observable<Post> {
    const url = `${apiPosts}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap((_) => console.log(`fetched post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  uploadS3(file: File) {
    if (!file) {
      return;
    }
    const req = new HttpRequest("PUT", apiAwsPut, file, {
      reportProgress: true,
    });

    // The `HttpClient.request` API produces a raw event stream
    // which includes start (sent), progress, and response events.
    return this.http.request(req).pipe();
  }

  addPost(post): Observable<any> {
    return this.http
      .put<any>(apiAwsPut, post, httpOptions)
      .pipe
      // tap((post: Post) => console.log('added post')),
      // catchError(this.handleError<Post>('error add Post'))
      ();
  }
}
