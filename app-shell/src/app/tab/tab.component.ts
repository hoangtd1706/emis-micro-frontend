import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppModelViewApi } from '../auth/auth.model';

@Component({
  selector: 'tab-app',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  tabs: AppModelViewApi[] = [];

  constructor(readonly auth: AuthService, readonly route: ActivatedRoute) {
    auth.getApps();
  }

  async ngAfterViewInit() {
    for (const m of this.auth.apps) {
      this.tabs.push(m);
    }
  }

  logout() {
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('access_token');
    window.location.reload();
  }
}
