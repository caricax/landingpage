import { Routes } from '@angular/router';
import { App } from './app';
import { BrandingGuidelinesComponent } from './pages/branding-guidelines.component';

export const routes: Routes = [
  {
    path: '',
    component: App
  },
  {
    path: 'branding-guidelines',
    component: BrandingGuidelinesComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
