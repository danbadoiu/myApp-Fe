import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Post } from "src/app/models/posts.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient, private router: Router) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${environment.apiUrl}/core/api/v1/posts`
    );
  }

  public addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(
      `${environment.apiUrl}/core/api/v1/posts`,
      post
    );
  }
}
