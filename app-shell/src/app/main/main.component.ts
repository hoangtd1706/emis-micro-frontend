import { Component, QueryList, ViewChildren } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main',
  // templateUrl: './main.component.html',
  template: `
    <ng-container #comp *ngFor="let item of tabs" [ngSwitch]="item.framework">
      <app-react-wrapper
        *ngSwitchCase="'react'"
        [component]="item.component"
      ></app-react-wrapper>
      <app-vue-wrapper
        *ngSwitchCase="'vue'"
        [component]="item.component"
      ></app-vue-wrapper>
      <app-angular-wrapper
        *ngSwitchDefault
        [component]="item.component"
      ></app-angular-wrapper>
    </ng-container>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  @ViewChildren('comp') components!: QueryList<any>;
  tabs: any = [];

  constructor(readonly auth: AuthService, private route: ActivatedRoute) {
    this.loadApp();
  }

  async loadApp() {
    if (this.auth.isLoggedIn) {
      if (this.auth.apps.length === 0) await this.auth.getApps();
      this.route.paramMap.subscribe((param) => {
        this.changePath(param.get('id') as string);
      });
    }
  }

  async changePath(path: string) {
    let app = this.auth.apps.find((x) => x.remoteName === path);
    this.tabs = [];
    if (app) {
      loadRemoteModule(app).then((module) => {
        this.tabs.push(module.default);
      });
    }
  }
}
