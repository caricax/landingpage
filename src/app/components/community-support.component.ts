import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-community-support',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      id="community-support"
      class="mt-2 border-t border-gray-200 pt-4 dark:border-gray-800/70"
      [attr.aria-labelledby]="'community-support-title'"
    >
      <p id="community-support-title" class="mb-2 text-fluid-xs font-hack font-bold uppercase tracking-wider text-caricax-orange">
        {{ languageService.translate('support.community.eyebrow') }}
      </p>
      <p class="max-w-sm text-fluid-xs sm:text-fluid-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {{ languageService.translate('support.community.footer') }}
      </p>
      <div class="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          href="https://github.com/sponsors/kernelpenguin"
          target="_blank"
          rel="noopener noreferrer"
          class="touch-target inline-flex items-center justify-center rounded-md border border-caricax-green/60 px-3 py-2 text-fluid-xs font-hack font-bold text-caricax-green transition-colors hover:bg-caricax-green hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caricax-green"
        >
          {{ languageService.translate('support.community.github') }}
        </a>
        <a
          href="https://www.buymeacoffee.com/kernelpenguin"
          target="_blank"
          rel="noopener noreferrer"
          class="touch-target inline-flex items-center justify-center rounded-md border border-caricax-orange/70 px-3 py-2 text-fluid-xs font-hack font-bold text-caricax-orange transition-colors hover:bg-caricax-orange hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caricax-orange"
        >
          {{ languageService.translate('support.community.coffee') }}
        </a>
      </div>
    </div>
  `
})
export class CommunitySupportComponent {
  readonly languageService = inject(LanguageService);
}
