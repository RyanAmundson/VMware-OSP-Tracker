import { Component } from '@angular/core';
import { ScrollService } from './_services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hire-worthy-open-source-tracker';

  constructor(private scroll: ScrollService) { }

  notifyScroll(event): void {
    this.scroll.notify(event);
  }
}
