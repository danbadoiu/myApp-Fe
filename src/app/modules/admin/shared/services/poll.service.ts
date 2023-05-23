import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Poll } from '../models/poll.model';

@Injectable({ providedIn: 'root' })
export class PollService {
  constructor(private http: HttpClient, private router: Router) {}

  getPolls(): Observable<Poll[]> {
    return this.http.get<Poll[]>(`${environment.apiUrl}/poll`).pipe(
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
    formData.append('idPost',poll.idPost)
    formData.append('answer', poll.answer);
    return this.http.post<Poll>(
      // `${environment.apiUrl}/core/api/v1/users`,
      `${environment.apiUrl}/poll`,
      formData
    );
  }
  public deletePoll(pollId: string): Observable<unknown> {
    return this.http.delete(`${environment.apiUrl}/poll/${pollId}`);
  }
  public updatePoll(
    pollId: string,
    poll: Poll
  ): Observable<unknown> {
    const formData = new FormData();
    formData.append('answer', poll.answer);
    formData.append('idPost', poll.idPost);
    return this.http.put<Poll>(
      // `${environment.apiUrl}/core/api/v1/users`,
      `${environment.apiUrl}/poll/${pollId}`,
      formData
    );
  }
}
