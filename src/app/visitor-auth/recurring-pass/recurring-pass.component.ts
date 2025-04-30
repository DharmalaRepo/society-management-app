import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { VisitorAuthService } from '../../core/services/visitor-auth/visitor-auth.service';
import { RecurringVisitorPass } from 'src/app/core/models/visitor-auth/recurring-visitor-pass.model';

@Component({
  selector: 'app-recurring-pass',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './recurring-pass.component.html',
  styleUrls: ['./recurring-pass.component.scss']
})
export class RecurringPassComponent {
  private fb = inject(FormBuilder);
  private service = inject(VisitorAuthService);

  form: FormGroup = this.fb.group({
    visitorName: [''],
    visitorMobile: [''],
    days: [[]],
    timeRange: [''],
    flatId: [''],
    enabled: [true]
  });

  displayedColumns: string[] = ['visitorName', 'visitorMobile', 'days', 'timeRange', 'enabled', 'actions'];
  recurringPasses: RecurringVisitorPass[] = [];

  ngOnInit() {
    this.fetchRecurringPasses();
  }

  fetchRecurringPasses() {
    this.service.getRecurringPasses().subscribe({
      next: (data) => (this.recurringPasses = data),
      error: (err) => console.error('Failed to fetch recurring passes', err)
    });
  }

  savePass() {
    const payload = this.form.value as RecurringVisitorPass;
    this.service.createRecurringPass(payload).subscribe({
      next: () => {
        this.form.reset();
        this.fetchRecurringPasses();
      }
    });
  }

  togglePass(pass: RecurringVisitorPass) {
    this.service.toggleRecurringPass(pass.id!, !pass.enabled).subscribe(() => {
      pass.enabled = !pass.enabled;
    });
  }

  deletePass(id: string) {
    this.service.deleteRecurringPass(id).subscribe(() => {
      this.recurringPasses = this.recurringPasses.filter(p => p.id !== id);
    });
  }
}
