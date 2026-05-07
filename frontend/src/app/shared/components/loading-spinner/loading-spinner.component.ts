import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="spinner-container">
      <div class="portal"></div>
      <p class="loading-text">Abriendo portal...</p>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      gap: 1rem;
    }
    .portal {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 4px solid transparent;
      border-top-color: #97ce4c;
      border-right-color: #06b6d4;
      animation: spin 0.8s linear infinite;
    }
    .loading-text {
      color: #97ce4c;
      font-size: 0.9rem;
      letter-spacing: 0.05em;
      margin: 0;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingSpinnerComponent {}
