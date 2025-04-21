import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="welcome-page">
      <h1>Welcome to Society Management</h1>
      <button routerLink="/auth/login">Login</button>
    </div>
  `,
  styles: [`
    .welcome-page { text-align: center; padding: 2rem; }
  `]
})
export class WelcomeComponent {}
