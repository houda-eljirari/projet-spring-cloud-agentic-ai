import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccount } from '../models/ebank.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private host = 'http://localhost:8080/ebank-service/api';

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<Array<BankAccount>> {
    return this.http.get<Array<BankAccount>>(`${this.host}/accounts`);
  }
}
