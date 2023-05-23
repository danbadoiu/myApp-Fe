import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private http: HttpClient, private router: Router) {}

  // getMessages(): Observable<Message[]> {
  //   return this.http.get<Message[]>(
  //     `${environment.apiUrl}/core/api/v1/messages`
  //   );
  // }

  // public addMessage(message: Message): Observable<Message> {
  //   return this.http.post<Message>(
  //     `${environment.apiUrl}/core/api/v1/messages`,
  //     message
  //   );
  // }
  public addMessage(message: Message): Observable<Message> {
    const message2 = JSON.stringify(message);
    const formData = new FormData();
    const date = new Date();
    const dateString = date.toISOString().replace('T', ' ').slice(0, 19);

    if (message.picture !== undefined) {
      formData.append('picture', message.picture);
    }

    formData.append('idSender', message.idSender);
    formData.append('idReceiver', message.idReceiver);
    formData.append('date', dateString);
    formData.append('message', message.message);

    return this.http.post<Message>(
      // `${environment.apiUrl}/core/api/v1/users`,
      `${environment.apiUrl}/message`,
      formData
    );
  }
  public deleteMessage(id: string): Observable<unknown> {
    return this.http.delete(`${environment.apiUrl}/message/${id}`);
  }
}
