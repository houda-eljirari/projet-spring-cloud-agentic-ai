import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/ebank.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private host = 'http://localhost:8080/customer-service/api';

  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`${this.host}/customers`);
  }
}
