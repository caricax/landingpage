import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  const storageKey = 'caricax-language';

  const createService = (savedLanguageCode?: string): LanguageService => {
    TestBed.resetTestingModule();
    localStorage.removeItem(storageKey);

    if (savedLanguageCode !== undefined) {
      localStorage.setItem(storageKey, savedLanguageCode);
    }

    TestBed.configureTestingModule({});
    return TestBed.inject(LanguageService);
  };

  afterEach(() => {
    localStorage.removeItem(storageKey);
  });

  it('starts with Portuguese when there is no saved language', () => {
    const service = createService();
    expect(service.currentLanguage().code).toBe('pt');
  });

  it('loads a valid saved language from storage', () => {
    const service = createService('en');
    expect(service.currentLanguage().code).toBe('en');
  });

  it('ignores an invalid saved language code', () => {
    const service = createService('de');
    expect(service.currentLanguage().code).toBe('pt');
  });

  it('returns the key when translation is missing', () => {
    const service = createService();
    expect(service.translate('missing.translation.key')).toBe('missing.translation.key');
  });

  it('cycles through languages in deterministic order', () => {
    const service = createService();

    service.switchLanguage();
    expect(service.currentLanguage().code).toBe('en');

    service.switchLanguage();
    expect(service.currentLanguage().code).toBe('es');

    service.switchLanguage();
    expect(service.currentLanguage().code).toBe('pt');
  });

  it('setLanguage changes language and persists preference', () => {
    const service = createService();

    service.setLanguage('es');

    expect(service.currentLanguage().code).toBe('es');
    expect(localStorage.getItem(storageKey)).toBe('es');
  });

  it('setLanguage ignores unsupported language codes', () => {
    const service = createService();

    service.setLanguage('de');

    expect(service.currentLanguage().code).toBe('pt');
    expect(localStorage.getItem(storageKey)).not.toBe('de');
  });
});
