import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SocietyRegistrationRequestDTO } from '../core/models/society-registration/society-registration.model';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-register-society',
  standalone: true,
  imports: [
    CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatExpansionModule,
      MatButtonModule,
      MatCardModule,
      NgIf,
      NgFor
  ],
  templateUrl: './register-society.component.html',
  styleUrls: ['./register-society.component.scss']
})
export class RegisterSocietyComponent {
  registerForm: FormGroup;
  submitting = false;

  blocks: string[] = [];
  blockFloorMap: { [block: string]: string[] } = {};
  flatList: { blockName: string; floor: string; flatNumber: string }[] = [];

  amenitiesList: { name: string; location: string }[] = [];
  parkingList: { spotNumber: string; type: string }[] = [];
  expenseCategoriesList: { categoryName: string }[] = [];
  staffDepartmentsList: { departmentName: string }[] = [];

  selectedBlockForFloors = '';
  floorInput = '';

  selectedBlockForFlats = '';
  selectedFloorForFlats = '';
  flatNumbersInput = '';

  amenityInput = '';
  parkingSpotInput = '';
  parkingTypeInput = '';
  expenseCategoryInput = '';
  staffDepartmentInput = '';

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
      blockNamesInput: ['']
    });
  }

  saveBlocks() {
    const input = this.registerForm.value.blockNamesInput || '';
    this.blocks = input.split(',')
      .map((b: string) => b.trim())
      .map((f: string) => f.trim())

    this.blocks.forEach(block => {
      if (!this.blockFloorMap[block]) {
        this.blockFloorMap[block] = [];
      }
    });

    this.snackBar.open('Blocks saved!', 'Close', { duration: 2000 });
  }

  saveFloors() {
    if (this.selectedBlockForFloors && this.floorInput) {
      const floors = this.floorInput.split(',')
        .map(f => f.trim())
        .filter(f => f);
      this.blockFloorMap[this.selectedBlockForFloors] = floors;
      this.floorInput = '';
      this.snackBar.open('Floors saved!', 'Close', { duration: 2000 });
    }
  }

  saveFlats() {
    if (this.selectedBlockForFlats && this.selectedFloorForFlats && this.flatNumbersInput) {
      const flats = this.flatNumbersInput.split(',')
        .map(f => f.trim())
        .filter(f => f);

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
    if (this.amenityInput) {
      this.amenitiesList.push({ name: this.amenityInput, location: '' });
      this.amenityInput = '';
      this.snackBar.open('Amenity added!', 'Close', { duration: 2000 });
    }
  }

  saveParking() {
    if (this.parkingSpotInput && this.parkingTypeInput) {
      this.parkingList.push({ spotNumber: this.parkingSpotInput, type: this.parkingTypeInput });
      this.parkingSpotInput = '';
      this.parkingTypeInput = '';
      this.snackBar.open('Parking slot added!', 'Close', { duration: 2000 });
    }
  }

  saveExpenseCategory() {
    if (this.expenseCategoryInput) {
      this.expenseCategoriesList.push({ categoryName: this.expenseCategoryInput });
      this.expenseCategoryInput = '';
      this.snackBar.open('Expense category added!', 'Close', { duration: 2000 });
    }
  }

  saveStaffDepartment() {
    if (this.staffDepartmentInput) {
      this.staffDepartmentsList.push({ departmentName: this.staffDepartmentInput });
      this.staffDepartmentInput = '';
      this.snackBar.open('Staff department added!', 'Close', { duration: 2000 });
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload: SocietyRegistrationRequestDTO = {
      societyMaster: this.registerForm.value.societyMaster,
      flats: this.flatList.map(flat => ({
        societyIdentifier: '',
        blockName: flat.blockName,
        floor: flat.floor,
        flatNumber: flat.flatNumber,
        type: '',
        areaInSqFt: 0,
        isActive: 1,
        occupied: false,
        id: '',
        customId: 0
      })),
      amenities: this.amenitiesList.map(a => ({
        id: '',
        customId: 0,
        societyIdentifier: '',
        name: a.name,
        description: '',
        location: a.location,
        isActive: 1
      })),
      parkingSlots: this.parkingList.map(p => ({
        id: '',
        customId: 0,
        societyIdentifier: '',
        spotNumber: p.spotNumber,
        type: p.type,
        allocatedToFlatNumber: '',
        isActive: 1,
        occupied: false
      })),
      maintenanceSetting: {
        id: '',
        customId: 0,
        societyIdentifier: '',
        frequency: 'Monthly',
        amount: 0,
        dueDate: '2025-01-01',
        lateFee: 0,
        isActive: 1
      },
      expenseCategories: this.expenseCategoriesList.map(e => ({
        societyIdentifier: '',
        categoryName: e.categoryName,
        description: ''
      })),
      staffDepartments: this.staffDepartmentsList.map(d => ({
        societyIdentifier: '',
        departmentName: d.departmentName,
        description: ''
      }))
    };

    this.submitting = true;

    this.http.post(`${environment.societyApiUrl}/api/societies/register`, payload, {
      responseType: 'text' as 'json'   // <- important line!
      })
      .subscribe({
        next: () => {
          this.snackBar.open('Society Registration Successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/welcome']);
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Registration failed. Please try again.', 'Close', { duration: 3000 });
          this.submitting = false;
        }
      });
  }
}
