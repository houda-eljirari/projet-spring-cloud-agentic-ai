import { Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' }
];
