import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private host = 'http://localhost:8080/ebank-chatbot-service/api';

  constructor(private http: HttpClient) {}

  public askAgent(query: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(`${this.host}/chat`, { query });
  }
}
