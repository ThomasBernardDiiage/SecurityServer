import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.component';
import { TimerHandle } from 'rxjs/internal/scheduler/timerHandle';
import { AdService } from './ad.service';

@Component({
  selector: 'app-information',
  styleUrls: ['./information.component.scss'],
  template: `
    <div class="ad-banner-example">
      <ng-template adHost></ng-template>
    </div>
  `,
})
export class AdBannerComponent implements OnInit, OnDestroy {
  /**
   *
   */
  constructor(private _adService: AdService) {}
  @Input() ads: AdItem[] = this._adService.getAds();

  currentAdIndex = -1;

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  interval: TimerHandle | undefined;

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;

    const adItem = this.ads[this.currentAdIndex];

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(
      adItem.component
    );

    componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 13000);
  }
}
