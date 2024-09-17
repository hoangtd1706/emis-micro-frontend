import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppModelViewApi } from '../auth/auth.model';

@Component({
  selector: 'tab-app',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  tabs: AppModelViewApi[] = [];
  open: boolean = false;
  appRoot = document.getElementById('app__root');

  constructor(readonly auth: AuthService, private router: Router) {
    auth.getApps();
    auth.getAppUser();
  }

  onChangePath(path: string) {
    this.toggleAppsPanel();
    this.router.navigate([path]);
  }

  toggleAppsPanel() {
    this.open = !this.open;
    var appRoot = document.getElementById('app__root');
    var appsPanel = document.getElementById('apps_panel');
    var overlay = document.getElementById('app__overlay');
    if (appRoot && appsPanel) {
      if (this.open) {
        appRoot.classList.add('open__panel');
        appsPanel.classList.add('active');
        overlay?.classList.add('visible');
      } else {
        appRoot.classList.remove('open__panel');
        appsPanel.classList.remove('active');
        overlay?.classList.remove('visible');
      }
    }
  }

  async ngAfterViewInit() {
    for (const m of this.auth.apps) {
      this.tabs.push(m);
    }
  }

  logout() {
    this.auth.logout();
  }
}
