import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  language?: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  readonly linkedInUrl = 'https://linkedin.com/company/caricax';

  sendEmail(_formData: ContactForm): Observable<EmailResponse> {
    this.openLinkedIn();

    return of({
      success: true,
      message: 'LinkedIn contact opened'
    }).pipe(delay(300));
  }

  openLinkedIn(): void {
    window.open(this.linkedInUrl, '_blank', 'noopener,noreferrer');
  }
}
