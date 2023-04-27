import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Poll } from '../models/poll.model';

@Injectable({ providedIn: 'root' })
export class PollService {
  constructor(private http: HttpClient, private router: Router) {}

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>('http://localhost:8080/poll').pipe(
      map((responseData) => {
        return responseData;
      })
    );
  }

  // public addPost(post: Post): Observable<Post> {
  //   return this.http.post<Post>(
  //     `${environment.apiUrl}/core/api/v1/posts`,
  //     post
  //   );
  // }
  public addPoll(poll: Poll): Observable<Poll> {
    const formData = new FormData();
    formData.append('question', poll.question);
    formData.append('keys', poll.keys);
    formData.append('options', poll.options);
    return this.http.post<Poll>(
      // `${environment.apiUrl}/core/api/v1/users`,
      'http://localhost:8080/poll',
      formData
    );
  }
  public deletePost(postId: string): Observable<unknown> {
    return this.http.delete(`http://localhost:8080/post/${postId}`);
  }
  public updatePoll(
    pollId: string,
    poll: Poll
  ): Observable<unknown> {
    const formData = new FormData();
    formData.append('question', poll.question);
    formData.append('keys', poll.keys);
    formData.append('options', poll.options);
    return this.http.put<Poll>(
      // `${environment.apiUrl}/core/api/v1/users`,
      `http://localhost:8080/poll/${pollId}`,
      formData
    );
  }
}
