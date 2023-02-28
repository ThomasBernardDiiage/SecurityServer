import { Injectable } from '@angular/core';

import { InfoNewsComponent } from './info-news.component';
import { InfoComponent } from './info.component';
import { AdItem } from './ad-item';

@Injectable()
export class AdService {
  getAds() {
    return [
      new AdItem(InfoComponent, {
        headline: 'Welcome to our Security Server !',
      }),
      new AdItem(InfoComponent, {
        headline: '© 2024-DI2-P2-G4 - Thomas BERNARD | Nicolas RICHET | Clément DELARUE | Axel MAUCOLOT | Hissein MAHAMAT | Baptiste RAMEAU',
      }),
      new AdItem(InfoNewsComponent, {
        headline: 'Subscribe to @thomas_bern Instagram account !',
      }),
      new AdItem(InfoNewsComponent, {
        headline: 'UI/UX Designed by Thomas BERNARD',
      }),
    ];
  }
}
