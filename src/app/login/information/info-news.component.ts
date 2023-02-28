import { Component, Input } from '@angular/core';

import { AdComponent } from './ad.component';

@Component({
  styleUrls: ['./information.component.scss'],
  template: `
    <div class="container">
      <p class="scrolling-text">{{ data.headline }}</p>
    </div>
  `,
})
export class InfoNewsComponent implements AdComponent {
  @Input() data: any;
}
