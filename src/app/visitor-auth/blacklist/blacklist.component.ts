import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { VisitorAuthService } from '../../core/services/visitor-auth/visitor-auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blacklist',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent implements OnInit {
  private fb = inject(FormBuilder);
  private visitorService = inject(VisitorAuthService);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  blacklistedItems: string[] = [];
  displayedColumns = ['value', 'actions'];

  ngOnInit(): void {
    this.form = this.fb.group({
      mobileOrName: ['', Validators.required]
    });
    this.fetchBlacklist();
  }

  fetchBlacklist() {
    this.visitorService.getBlacklist().subscribe({
      next: (data: string[]) => {
        this.blacklistedItems = data;
      },
      error: (err: any) => {
        console.error('Error fetching blacklist', err);
      }
    });
  }

  addToBlacklist() {
    if (this.form.invalid) return;
    const value = this.form.value.mobileOrName;
    this.visitorService.blacklist(value).subscribe({
      next: () => {
        this.snackBar.open('Added to blacklist', 'Close', { duration: 3000 });
        this.form.reset();
        this.fetchBlacklist();
      },
      error: () => {
        this.snackBar.open('Failed to blacklist', 'Close', { duration: 3000 });
      }
    });
  }

  removeFromBlacklist(value: string) {
    this.visitorService.unblacklist(value).subscribe({
      next: () => {
        this.snackBar.open('Removed from blacklist', 'Close', { duration: 3000 });
        this.fetchBlacklist();
      },
      error: () => {
        this.snackBar.open('Failed to remove', 'Close', { duration: 3000 });
      }
    });
  }
}
