import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, RouterModule],
})
export class HeaderComponent {
  private auth = inject(AuthService);
  user: any;
  username = sessionStorage.getItem('username') || 'User';
  societyName = '';

  @Output() toggleSidebar = new EventEmitter<void>();
  currentTime = new Date().toLocaleTimeString();

  societyIdentifier = sessionStorage.getItem('societyIdentifier') || 'N/A';



  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = sessionStorage.getItem('username') ?? '';
    this.societyName = user.societyId || 'N/A';
    setInterval(() => {
          this.currentTime = new Date().toLocaleTimeString();
        }, 1000);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  logout() {
    this.auth.logout(); // redirect inside logout()
  }
}
