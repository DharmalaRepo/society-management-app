
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

currentTime = new Date().toLocaleTimeString();

ngOnInit() {
  setInterval(() => {
    this.currentTime = new Date().toLocaleTimeString();
  }, 1000);
}

}
