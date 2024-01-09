import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export type TokenType = {
  token_type: string;
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
};

@Component({
  selector: 'app-callback',
  template: `<div></div>`,
})
export class CallbackComponent {
  loaders: any = [];
  code: string | null = null;

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] !== null) {
        this.auth.handleLoginCallback(params['code']);
      }
    });
  }
}
