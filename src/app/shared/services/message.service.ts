import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private http: HttpClient, private router: Router) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${environment.apiUrl}/core/api/v1/messages`
    );
  }

  public addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(
      `${environment.apiUrl}/core/api/v1/messages`,
      message
    );
  }
}
