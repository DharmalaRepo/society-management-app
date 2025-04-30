import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { VisitorAuthService } from 'src/app/core/services/visitor-auth/visitor-auth.service';

@Component({
  selector: 'app-visitor-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  templateUrl: './visitor-analytics.component.html',
})
export class VisitorAnalyticsComponent implements OnInit {
  totalVisits: number = 0;
  approvalStats = { approved: 0, rejected: 0 };
  mostActiveFlats: { flatNumber: string; count: number }[] = [];

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Most Active Flats' }],
  };

  pieChartData: ChartData<'pie'> = {
    labels: ['Approved', 'Rejected'],
    datasets: [{ data: [] }],
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  constructor(private visitorService: VisitorAuthService) {}

  ngOnInit(): void {
    this.visitorService.getVisitorAnalytics().subscribe((data) => {
      this.totalVisits = (data['totalVisits'] as unknown as number) || 0;
      this.approvalStats = data['approvalStats'] as { approved: number; rejected: number } || { approved: 0, rejected: 0 };
      this.mostActiveFlats = data['mostActiveFlats'] as { flatNumber: string; count: number }[] || [];

      this.barChartData.labels = this.mostActiveFlats.map(flat => flat.flatNumber);
      this.barChartData.datasets[0].data = this.mostActiveFlats.map(flat => flat.count);

      this.pieChartData.datasets[0].data = [
        this.approvalStats.approved,
        this.approvalStats.rejected,
      ];
    });
  }
}
