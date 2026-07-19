import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Use signal for reactive state management
  private readonly _isOpen = signal(false);
  
  // Readonly accessor
  readonly isOpen = this._isOpen.asReadonly();

  open(): void {
    this._isOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this._isOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  toggle(): void {
    this._isOpen.update(current => !current);
  }
}
