import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);

  // Use signal for reactive state management
  private readonly _isDark = signal(this.getInitialTheme());

  // Readonly accessor for the signal
  readonly isDark = this._isDark.asReadonly();

  constructor() {
    // Use effect to automatically apply theme changes
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        this.applyTheme(this._isDark());
        this.saveThemePreference(this._isDark());
      });
    }
  }

  toggleTheme(): void {
    this._isDark.update(current => !current);
  }

  setTheme(isDark: boolean): void {
    this._isDark.set(isDark);
  }

  private getInitialTheme(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return true; // Default to dark theme for SSR
    }

    // Prioriza preferencia persistida para evitar flash de tema
    const savedTheme = localStorage.getItem('caricax-theme');
    if (savedTheme !== null) {
      return savedTheme === 'dark';
    }

    // Dark-first: default to dark theme instead of system preference
    return true;
  }

  private applyTheme(isDark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Alterna classes de tema no DOM de forma centralizada
    if (isDark) {
      htmlElement.classList.add('dark');
      bodyElement.className = 'dark-theme';
    } else {
      htmlElement.classList.remove('dark');
      bodyElement.className = 'light-theme';
    }

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(isDark);
  }

  private saveThemePreference(isDark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    localStorage.setItem('caricax-theme', isDark ? 'dark' : 'light');
  }

  private updateMetaThemeColor(isDark: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const color = isDark ? '#000000' : '#ffffff';

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }
  }
}
