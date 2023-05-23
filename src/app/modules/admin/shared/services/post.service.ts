import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Post } from "src/app/models/posts.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient, private router: Router) {}

  // getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(
  //     `${environment.apiUrl}/core/api/v1/posts`
  //   );
  // }

  // public addPost(post: Post): Observable<Post> {
  //   return this.http.post<Post>(
  //     `${environment.apiUrl}/core/api/v1/posts`,
  //     post
  //   );
  // }
  public addPost(post: Post): Observable<Post> {
    const post2 = JSON.stringify(post);
    const formData = new FormData();
    const date = new Date();
    const dateString = date.toISOString().replace('T',' ').slice(0,19);
    formData.append('image', post.image);
    formData.append('idUser', post.idUser);
    formData.append('message', post.message);
    formData.append('date', dateString);
    formData.append('domain', post.domain);
    return this.http.post<Post>(
      // `${environment.apiUrl}/core/api/v1/users`,
      `${environment.apiUrl}/post`,
      formData
    );
  }
  public deletePost(postId: string):Observable<unknown>{
    return this.http.delete(
      `${environment.apiUrl}/post/${postId}`
    );
  }
 
}
