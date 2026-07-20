import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ContentModalType =
  | 'branding-guidelines'
  | 'services'
  | 'dashboard'
  | 'about'
  | 'products'
  | 'portfolio'
  | 'blog'
  | 'docs'
  | 'support'
  | 'contact'
  | 'labut-ai'
  | 'rescisao-facil'
  | 'accessibility'
  | 'legal-compliance'
  | 'legal-privacy'
  | 'legal-terms'
  | 'legal-cookies'
  | 'legal-lgpd'
  | 'legal-mit'
  | 'pix'
  | null;

export type OpenContentModalType = Exclude<ContentModalType, null>;

@Injectable({
  providedIn: 'root'
})
export class ContentModalService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _activeModal = signal<ContentModalType>(null);

  readonly activeModal = this._activeModal.asReadonly();

  get isOpen(): boolean {
    return this._activeModal() !== null;
  }

  openModal(type: OpenContentModalType): void {
    this._activeModal.set(type);
    this.setBodyOverflow('hidden');
  }

  closeModal(): void {
    this._activeModal.set(null);
    this.setBodyOverflow('auto');
  }

  toggleModal(type: OpenContentModalType): void {
    if (this._activeModal() === type) {
      this.closeModal();
    } else {
      this.openModal(type);
    }
  }

  private setBodyOverflow(value: 'auto' | 'hidden'): void {
    if (!this.isBrowser) {
      return;
    }

    document.body.style.overflow = value;
  }
}
