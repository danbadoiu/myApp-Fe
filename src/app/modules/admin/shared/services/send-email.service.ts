import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

constructor(private http: HttpClient) { }



public sendEmail(to:string,cc:string,subject:string,body:string): Observable<Object> {

  const formData = new FormData();

  formData.append('to', to);
  formData.append('cc', cc);
  formData.append('subject', subject);
  formData.append('body', body);
  return this.http.post(
    // `${environment.apiUrl}/core/api/v1/users`,
    `${environment.apiUrl}/mail/send`,
    formData
  );
}
}