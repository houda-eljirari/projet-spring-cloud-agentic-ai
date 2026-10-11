import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/account.service';
import { BankAccount } from '../../models/ebank.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card shadow-sm">
        <div class="card-header bg-success text-white">
          <h4 class="m-0"><i class="bi bi-wallet2 me-2"></i>Comptes Bancaires</h4>
        </div>
        <div class="card-body">
          <table class="table table-hover table-bordered">
            <thead class="table-dark">
              <tr>
                <th>Account ID</th>
                <th>Solde (MAD)</th>
                <th>Type</th>
                <th>Client</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let acc of accounts">
                <td><code>{{ acc.id }}</code></td>
                <td class="fw-bold text-success">{{ acc.balance | number:'1.2-2' }}</td>
                <td>
                  <span class="badge" [ngClass]="acc.type === 'CURRENT_ACCOUNT' ? 'bg-info' : 'bg-warning'">
                    {{ acc.type }}
                  </span>
                </td>
                <td>{{ acc.customer?.name || ('Client ID: ' + acc.customerId) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AccountsComponent implements OnInit {
  accounts: BankAccount[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe({
      next: (data) => this.accounts = data,
      error: (err) => console.error('Erreur chargement comptes', err)
    });
  }
}
