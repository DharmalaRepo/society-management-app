import { Component, OnInit } from '@angular/core';
import { SocietyService } from 'src/app/core/services/society.service';
import { SocietyDetailsResponseDTO } from 'src/app/core/models/society-registration/society-registration.model';
import { MatCardModule } from '@angular/material/card';
// ADD BELOW:
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-society-master',
  standalone: true,  // if you are using standalone
  imports: [
    NgIf, NgFor, AsyncPipe,
    MatTabsModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './society-master.component.html',
  styleUrls: ['./society-master.component.scss'],
})
export class SocietyMasterComponent implements OnInit {
  societyDetails!: SocietyDetailsResponseDTO;

  constructor(private societyService: SocietyService) {}

  ngOnInit(): void {
    this.loadSocietyDetails();
  }

  loadSocietyDetails(): void {
    this.societyService.getSocietyDetails().subscribe({
      next: (data) => {
        this.societyDetails = data;
      },
      error: (err) => {
        console.error('Error fetching society details', err);
      }
    });
  }
}
