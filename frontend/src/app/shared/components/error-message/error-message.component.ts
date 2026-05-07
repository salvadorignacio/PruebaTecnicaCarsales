import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  template: `
    <div class="error-container">
      <span class="error-icon">⚠</span>
      <p class="error-text">{{ message() }}</p>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid #ef4444;
      border-radius: 8px;
      padding: 1rem 1.5rem;
      margin: 1rem 0;
    }
    .error-icon {
      font-size: 1.25rem;
      color: #ef4444;
    }
    .error-text {
      color: #fca5a5;
      margin: 0;
      font-size: 0.95rem;
    }
  `]
})
export class ErrorMessageComponent {
  message = input.required<string>();
}
