import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { SocietyRegistrationRequestDTO } from 'src/app/core/models/society-registration/society-registration.model';

// Material modules
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register-society',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './register-society.component.html',
  styleUrls: ['./register-society.component.scss']
})
export class RegisterSocietyComponent {
  registerForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      societyMaster: this.fb.group({
        name: ['', Validators.required],
        registrationNumber: [''],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        pincode: ['', Validators.required]
      }),
      flats: this.fb.array([]),
      amenities: this.fb.array([]),
      parkingSlots: this.fb.array([]),
      maintenanceSetting: this.fb.group({
        frequency: ['', Validators.required],
        amount: [0, Validators.required],
        dueDate: ['', Validators.required],
        lateFee: [0, Validators.required]
      }),
      expenseCategories: this.fb.array([]),
      staffDepartments: this.fb.array([])
    });
  }

  // 🛠 Form Array Getters
  get flats(): FormArray {
    return this.registerForm.get('flats') as FormArray;
  }

  get amenities(): FormArray {
    return this.registerForm.get('amenities') as FormArray;
  }

  get parkingSlots(): FormArray {
    return this.registerForm.get('parkingSlots') as FormArray;
  }

  get expenseCategories(): FormArray {
    return this.registerForm.get('expenseCategories') as FormArray;
  }

  get staffDepartments(): FormArray {
    return this.registerForm.get('staffDepartments') as FormArray;
  }

  // 🛠 Add methods
  addFlat() {
    this.flats.push(this.fb.group({
      flatNumber: ['', Validators.required],
      blockName: ['', Validators.required],
      floor: ['', Validators.required],
      type: ['', Validators.required],
      areaInSqFt: [0, Validators.required]
    }));
  }

  addAmenity() {
    this.amenities.push(this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required]
    }));
  }

  addParkingSlot() {
    this.parkingSlots.push(this.fb.group({
      spotNumber: ['', Validators.required],
      type: ['', Validators.required],
      allocatedToFlatNumber: ['', Validators.required]
    }));
  }

  addExpenseCategory() {
    this.expenseCategories.push(this.fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  addStaffDepartment() {
    this.staffDepartments.push(this.fb.group({
      departmentName: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  // 🛠 Remove methods
  removeFlat(index: number) {
    this.flats.removeAt(index);
  }

  removeAmenity(index: number) {
    this.amenities.removeAt(index);
  }

  removeParkingSlot(index: number) {
    this.parkingSlots.removeAt(index);
  }

  removeExpenseCategory(index: number) {
    this.expenseCategories.removeAt(index);
  }

  removeStaffDepartment(index: number) {
    this.staffDepartments.removeAt(index);
  }

  // 🛠 Final Submit
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload: SocietyRegistrationRequestDTO = this.registerForm.value;

    this.submitting = true;

    this.http.post(`${environment.societyApiUrl}/api/societies/register`, payload, {
       headers: {
       'Content-Type': 'application/json'
       },
       responseType: 'text' as 'json'
       })
      .subscribe({
        next: () => {
          this.snackBar.open('Society registered successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
          this.submitting = false;
        }
      });
  }
}
