import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-society',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule
  ],
  templateUrl: './register-society.component.html',
  styleUrls: ['./register-society.component.scss']
})
export class RegisterSocietyComponent {
  registerForm: FormGroup;
  submitting = false;

  blocks: string[] = [];
  blockFloorMap: { [block: string]: string[] } = {};

  selectedBlockForFloors = '';
  floorInput = '';

  selectedBlockForFlats = '';
  selectedFloorForFlats = '';
  flatNumbersInput = '';

  flatList: any[] = [];

  amenityInput = '';
  amenitiesList: string[] = [];

  parkingSpotInput = '';
  parkingTypeInput = '';
  parkingSlotsList: any[] = [];

  expenseCategoryInput = '';
  expenseCategoriesList: string[] = [];

  staffDepartmentInput = '';
  staffDepartmentsList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      societyMaster: this.fb.group({
        name: ['', Validators.required],
        registrationNumber: [''],
        address: [''],
        city: [''],
        state: [''],
        country: [''],
        pincode: ['']
      }),
      blockNamesInput: [''],
      admin: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        username: [''],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  saveBlocks() {
    const input = this.registerForm.get('blockNamesInput')?.value || '';
    this.blocks = input.split(',').map((b: string) => b.trim()).filter((b: string) => b);
    this.snackBar.open('Blocks saved!', 'Close', { duration: 2000 });
  }

  saveFloors() {
    if (this.selectedBlockForFloors && this.floorInput) {
      const floors = this.floorInput.split(',').map((f: string) => f.trim()).filter((f: string) => f);
      this.blockFloorMap[this.selectedBlockForFloors] = floors;
      this.floorInput = '';
      this.snackBar.open('Floors saved!', 'Close', { duration: 2000 });
    }
  }

  saveFlats() {
    if (this.selectedBlockForFlats && this.selectedFloorForFlats && this.flatNumbersInput) {
      const flats = this.flatNumbersInput.split(',').map((f: string) => f.trim()).filter((f: string) => f);
      flats.forEach(flatNumber => {
        this.flatList.push({
          blockName: this.selectedBlockForFlats,
          floor: this.selectedFloorForFlats,
          flatNumber
        });
      });
      this.flatNumbersInput = '';
      this.snackBar.open('Flats saved!', 'Close', { duration: 2000 });
    }
  }

  saveAmenity() {
    if (this.amenityInput.trim()) {
      this.amenitiesList.push(this.amenityInput.trim());
      this.amenityInput = '';
      this.snackBar.open('Amenity added!', 'Close', { duration: 2000 });
    }
  }

  saveParking() {
    if (this.parkingSpotInput.trim() && this.parkingTypeInput.trim()) {
      this.parkingSlotsList.push({
        spotNumber: this.parkingSpotInput.trim(),
        type: this.parkingTypeInput.trim()
      });
      this.parkingSpotInput = '';
      this.parkingTypeInput = '';
      this.snackBar.open('Parking slot added!', 'Close', { duration: 2000 });
    }
  }

  saveExpenseCategory() {
    if (this.expenseCategoryInput.trim()) {
      this.expenseCategoriesList.push(this.expenseCategoryInput.trim());
      this.expenseCategoryInput = '';
      this.snackBar.open('Expense category added!', 'Close', { duration: 2000 });
    }
  }

  saveStaffDepartment() {
    if (this.staffDepartmentInput.trim()) {
      this.staffDepartmentsList.push(this.staffDepartmentInput.trim());
      this.staffDepartmentInput = '';
      this.snackBar.open('Staff department added!', 'Close', { duration: 2000 });
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.snackBar.open('Please complete required fields.', 'Close', { duration: 3000 });
      return;
    }

    const formData = this.registerForm.value;
    const payload = {
      societyMaster: {
        ...formData.societyMaster,
        isActive: 1
      },
      flats: this.flatList.map(flat => ({
        blockName: flat.blockName,
        floor: flat.floor,
        flatNumber: flat.flatNumber,
        isActive: 1
      })),
      amenities: this.amenitiesList.map(name => ({
        name,
        isActive: 1
      })),
      parkingSlots: this.parkingSlotsList.map(slot => ({
        spotNumber: slot.spotNumber,
        type: slot.type,
        isActive: 1
      })),
      expenseCategories: this.expenseCategoriesList.map(name => ({
        categoryName: name,
        description: '',
      })),
      staffDepartments: this.staffDepartmentsList.map(name => ({
        departmentName: name,
        description: '',
      })),
      admin: {
        ...formData.admin
      }
    };

    this.submitting = true;

    this.http.post(`${environment.societyApiUrl}/api/societies/register`, payload, { responseType: 'text' })
      .subscribe({
        next: (response: any) => {
          this.snackBar.open(`🎉 Society Registered! Your Society ID: ${response}`, 'Close', { duration: 6000 });
          setTimeout(() => {
            this.router.navigate(['/welcome']);
          }, 3000);
        },
        error: (err) => {
          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 4000 });
          console.error(err);
          this.submitting = false;
        }
      });
  }
}
