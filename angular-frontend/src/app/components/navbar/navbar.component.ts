import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold text-primary" routerLink="/">
          <i class="bi bi-cpu-fill me-2"></i>EBank Agentic AI
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" routerLink="/customers" routerLinkActive="active">
                <i class="bi bi-people me-1"></i>Clients
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/accounts" routerLinkActive="active">
                <i class="bi bi-wallet2 me-1"></i>Comptes
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/chat" routerLinkActive="active">
                <i class="bi bi-robot me-1"></i>Chatbot AI
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
