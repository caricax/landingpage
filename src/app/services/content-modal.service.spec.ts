import { TestBed } from '@angular/core/testing';
import { ContentModalService } from './content-modal.service';

describe('ContentModalService', () => {
  let service: ContentModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentModalService);
    document.body.style.overflow = 'auto';
  });

  afterEach(() => {
    service.closeModal();
  });

  it('opens modal and locks body scroll', () => {
    service.openModal('legal-compliance');

    expect(service.activeModal()).toBe('legal-compliance');
    expect(service.isOpen).toBeTrue();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes modal and restores body scroll', () => {
    service.openModal('legal-mit');
    service.closeModal();

    expect(service.activeModal()).toBeNull();
    expect(service.isOpen).toBeFalse();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('toggleModal closes when same modal is active', () => {
    service.toggleModal('legal-compliance');
    expect(service.activeModal()).toBe('legal-compliance');

    service.toggleModal('legal-compliance');
    expect(service.activeModal()).toBeNull();
  });

  it('toggleModal switches to a new modal when different modal is requested', () => {
    service.openModal('legal-privacy');
    service.toggleModal('legal-terms');

    expect(service.activeModal()).toBe('legal-terms');
    expect(service.isOpen).toBeTrue();
  });
});
