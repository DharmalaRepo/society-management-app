import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocietyService } from '../../core/services/society.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SocietyMaster } from 'src/app/core/models/society-registration/society-details.model';

@Component({
  selector: 'app-society-master',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './society-master.component.html',
  styleUrls: ['./society-master.component.scss']
})
export class SocietyMasterComponent implements OnInit {
  private societyService = inject(SocietyService);
  societyMaster: SocietyMaster | null = null;
  loading = false;

  ngOnInit(): void {
    this.fetchSocietyDetails();
  }

  fetchSocietyDetails(): void {
    this.loading = true;
    this.societyService.getSocietyDetails().subscribe({
      next: (data) => {
        this.societyMaster = data?.societyMaster || null;
        this.loading = false;
      },
      error: () => {
        this.societyMaster = null;
        this.loading = false;
      }
    });
  }
}
