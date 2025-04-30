import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitorEntry } from '../../models/visitor-auth/visitor-entry.model';
import { VisitorEntryRequest } from '../../models/visitor-auth/visitor-entry-request.model';
import { OtpVerificationRequest } from '../../models/visitor-auth/otp-verification-request.model';
import { VisitorApprovalResponse } from '../../models/visitor-auth/visitor-approval-response.model';
import { RecurringVisitorPass } from '../../models/visitor-auth/recurring-visitor-pass.model';
import { VisitorAnalytics } from '../../models/visitor-auth/visitor-analytics.model';

@Injectable({
  providedIn: 'root',
})
export class VisitorAuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:9090/api/visitor-entries';

  generateOtp(request: VisitorEntryRequest): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/generate-otp`, request);
  }

  verifyOtp(request: OtpVerificationRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/verify-otp`, request);
  }

  getTodayVisitors(): Observable<VisitorEntry[]> {
    return this.http.get<VisitorEntry[]>(`${this.apiUrl}/today`);
  }

  getPendingRequests(): Observable<VisitorEntry[]> {
      return this.http.get<VisitorEntry[]>(`${this.apiUrl}/pending-requests`);
    }




  resendOtp(entryId: string): Observable<boolean> {
    const params = new HttpParams().set('entryId', entryId);
    return this.http.post<boolean>(`${this.apiUrl}/resend-otp`, null, { params });
  }

  cancelOtp(entryId: string): Observable<boolean> {
    const params = new HttpParams().set('entryId', entryId);
    return this.http.post<boolean>(`${this.apiUrl}/cancel-otp`, null, { params });
  }

  requestApproval(request: VisitorEntryRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/request-approval`, request);
  }

  respondToApproval(response: VisitorApprovalResponse): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/respond-approval`, response);
  }

  getVisitorLogsSearch(input: string): Observable<VisitorEntry[]> {
    const params = new HttpParams().set('input', input);
    return this.http.get<VisitorEntry[]>(`${this.apiUrl}/search`, { params });
  }

  getAnalytics(): Observable<VisitorAnalytics> {
    return this.http.get<VisitorAnalytics>(`${this.apiUrl}/analytics`);
  }

  uploadPhoto(entryId: string, photoUrl: string): Observable<void> {
    const params = new HttpParams()
      .set('entryId', entryId)
      .set('photoUrl', photoUrl);
    return this.http.post<void>(`${this.apiUrl}/upload-photo`, null, { params });
  }

  markSuspicious(entryId: string, note: string): Observable<void> {
    const params = new HttpParams()
      .set('entryId', entryId)
      .set('note', note);
    return this.http.post<void>(`${this.apiUrl}/suspicious`, null, { params });
  }

  markExit(entryId: string, time: string): Observable<void> {
    const params = new HttpParams()
      .set('entryId', entryId)
      .set('time', time);
    return this.http.post<void>(`${this.apiUrl}/exit`, null, { params });
  }

  blacklistVisitor(mobileOrName: string): Observable<void> {
    const params = new HttpParams().set('mobileOrName', mobileOrName);
    return this.http.post<void>(`${this.apiUrl}/blacklist`, null, { params });
  }

  isBlacklisted(mobileOrName: string): Observable<boolean> {
    const params = new HttpParams().set('mobileOrName', mobileOrName);
    return this.http.get<boolean>(`${this.apiUrl}/is-blacklisted`, { params });
  }

  getFrequentVisitors(flatId: string): Observable<string[]> {
    const params = new HttpParams().set('flatId', flatId);
    return this.http.get<string[]>(`${this.apiUrl}/frequent-visitors`, { params });
  }

  generateOtpQr(entryId: string): Observable<string> {
    const params = new HttpParams().set('entryId', entryId);
    return this.http.get<string>(`${this.apiUrl}/generate-otp-qr`, { params });
  }

  createRecurringPass(pass: RecurringVisitorPass): Observable<RecurringVisitorPass> {
    return this.http.post<RecurringVisitorPass>(`${this.apiUrl}/recurring`, pass);
  }

  toggleRecurringPass(id: string, enabled: boolean): Observable<RecurringVisitorPass> {
    const params = new HttpParams()
      .set('id', id)
      .set('enabled', enabled.toString());

    return this.http.post<RecurringVisitorPass>(`${this.apiUrl}/toggle-recurring`, null, { params });
  }

  deleteRecurringPass(id: string): Observable<void> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<void>(`${this.apiUrl}/recurring`, { params });
  }

  getRecurringPasses(): Observable<RecurringVisitorPass[]> {
    return this.http.get<RecurringVisitorPass[]>(`${this.apiUrl}/recurring`);
  }
  // 🚫 Get all blacklisted visitors
    getBlacklist(): Observable<string[]> {
      return this.http.get<string[]>(`${this.apiUrl}/blacklist`);
    }

    // 🚫 Add a visitor to the blacklist
    blacklist(value: string): Observable<void> {
      const params = new HttpParams().set('mobileOrName', value);
      return this.http.post<void>(`${this.apiUrl}/blacklist`, null, { params });
    }

    // ✅ Remove a visitor from the blacklist (custom backend endpoint must support this)
    unblacklist(value: string): Observable<void> {
      const params = new HttpParams().set('mobileOrName', value);
      return this.http.delete<void>(`${this.apiUrl}/blacklist`, { params });
    }

   getVisitorAnalytics(): Observable<VisitorAnalytics> {
     return this.http.get<VisitorAnalytics>(`${this.apiUrl}/analytics`);
   }


}
