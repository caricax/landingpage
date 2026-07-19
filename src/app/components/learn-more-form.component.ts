import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-learn-more-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-md w-full overflow-hidden mx-auto">
        <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex justify-between items-center gap-3 sm:gap-4">
            <h2 class="text-fluid-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {{ languageService.translate('form.learn_more.title') }}
            </h2>
            <button
              (click)="close()"
              class="touch-target p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0"
              [attr.aria-label]="languageService.translate('form.close')"
            >
              <svg aria-hidden="true" class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <p class="text-fluid-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-3 leading-relaxed font-hack">
            {{ languageService.translate('form.learn_more.subtitle') }}
          </p>
        </div>

        <div class="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <p class="text-fluid-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-hack">
            {{ languageService.translate('form.learn_more.linkedin_note') }}
          </p>
          <div class="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
            <button
              type="button"
              (click)="close()"
              class="touch-target px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-hack text-fluid-sm"
            >
              {{ languageService.translate('form.cancel') }}
            </button>
            <a
              href="https://linkedin.com/company/caricax"
              target="_blank"
              rel="noopener noreferrer"
              (click)="close()"
              class="touch-target inline-flex justify-center px-6 py-2 bg-caricax-green text-white rounded-md hover:bg-caricax-neon focus:outline-none focus:ring-2 focus:ring-caricax-green focus:ring-offset-2 transition-all duration-200 font-hack font-bold text-fluid-sm"
            >
              {{ languageService.translate('form.linkedin.cta') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LearnMoreFormComponent {
  readonly languageService = inject(LanguageService);
  private readonly dialogRef = inject(MatDialogRef<LearnMoreFormComponent>);

  close(): void {
    this.dialogRef.close();
  }
}
