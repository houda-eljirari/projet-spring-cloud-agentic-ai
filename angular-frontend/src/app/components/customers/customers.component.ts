import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/ebank.model';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 class="m-0"><i class="bi bi-people me-2"></i>Liste des Clients</h4>
        </div>
        <div class="card-body">
          <table class="table table-hover table-striped">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of customers">
                <td>{{ c.id }}</td>
                <td>{{ c.name }}</td>
                <td>{{ c.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Erreur chargement clients', err)
    });
  }
}
