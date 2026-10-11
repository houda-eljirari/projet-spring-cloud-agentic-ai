import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/ebank.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="card shadow" style="height: 80vh;">
        <div class="card-header bg-dark text-white d-flex align-items-center">
          <i class="bi bi-robot fs-4 me-2 text-primary"></i>
          <h5 class="m-0">Assistant Intelligent EBank (MCP Agent)</h5>
        </div>
        <div class="card-body overflow-auto" style="flex: 1;">
          <div *ngFor="let msg of messages" class="d-flex mb-3"
               [ngClass]="msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'">
            <div class="p-3 rounded-3 shadow-sm"
                 [ngClass]="msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark border'"
                 style="max-width: 75%;">
              <div>{{ msg.text }}</div>
              <small class="d-block mt-1 text-end opacity-75" style="font-size: 0.75rem;">
                {{ msg.timestamp | date:'HH:mm' }}
              </small>
            </div>
          </div>
        </div>
        <div class="card-footer bg-white border-top">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Posez une question à l'Agent IA..."
                   [(ngModel)]="userQuery" (keyup.enter)="sendMessage()" [disabled]="loading">
            <button class="btn btn-primary" (click)="sendMessage()" [disabled]="loading || !userQuery.trim()">
              <i class="bi bi-send-fill me-1"></i> Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent {
  userQuery: string = '';
  loading: boolean = false;
  messages: ChatMessage[] = [
    { sender: 'bot', text: 'Bonjour ! Je suis l\'agent conversationnel bancaire. Comment puis-je vous aider ?', timestamp: new Date() }
  ];

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (!this.userQuery.trim()) return;

    const query = this.userQuery;
    this.messages.push({ sender: 'user', text: query, timestamp: new Date() });
    this.userQuery = '';
    this.loading = true;

    this.chatService.askAgent(query).subscribe({
      next: (res) => {
        this.messages.push({ sender: 'bot', text: res.response, timestamp: new Date() });
        this.loading = false;
      },
      error: () => {
        this.messages.push({ sender: 'bot', text: 'Erreur de communication avec le serveur IA.', timestamp: new Date() });
        this.loading = false;
      }
    });
  }
}
