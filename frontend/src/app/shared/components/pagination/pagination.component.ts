import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    <nav class="pagination" aria-label="Paginación">
      <button
        class="page-btn"
        [disabled]="currentPage() === 1"
        (click)="onPageChange(currentPage() - 1)"
        aria-label="Página anterior"
      >
        ‹
      </button>

      @for (page of visiblePages(); track page) {
        @if (page === -1) {
          <span class="page-ellipsis">…</span>
        } @else {
          <button
            class="page-btn"
            [class.active]="page === currentPage()"
            (click)="onPageChange(page)"
            [attr.aria-current]="page === currentPage() ? 'page' : null"
          >
            {{ page }}
          </button>
        }
      }

      <button
        class="page-btn"
        [disabled]="currentPage() === totalPages()"
        (click)="onPageChange(currentPage() + 1)"
        aria-label="Página siguiente"
      >
        ›
      </button>
    </nav>
  `,
  styles: [`
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 1.5rem 0;
      flex-wrap: wrap;
    }
    .page-btn {
      min-width: 36px;
      height: 36px;
      border: 1px solid #374151;
      background: #1f2937;
      color: #d1d5db;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s;
      padding: 0 0.5rem;
    }
    .page-btn:hover:not(:disabled) {
      border-color: #97ce4c;
      color: #97ce4c;
      background: rgba(151, 206, 76, 0.1);
    }
    .page-btn.active {
      background: #97ce4c;
      border-color: #97ce4c;
      color: #111827;
      font-weight: 600;
    }
    .page-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .page-ellipsis {
      color: #6b7280;
      padding: 0 0.25rem;
    }
  `]
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: number[] = [1];
    if (current > 3) pages.push(-1);
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push(-1);
    pages.push(total);
    return pages;
  });

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
