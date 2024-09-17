import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { apiHostname } from 'src/config';
import { TokenType } from '../auth/auth.model';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent {
  code: string | null = null;
  loading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] !== null) {
        this.loading = true;
        this.getAccessToken(params['code'])
          .then((res) => {
            if (res !== null) {
              sessionStorage.setItem('access_token', res.access_token);
              localStorage.setItem('refresh_token', res.refresh_token);
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/login']);
            }
          })
          .catch((err) => {
            console.log('[Login] Cannot login', err);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    });
  }

  private getAccessToken = async (code: string): Promise<TokenType | null> => {
    try {
      const res = await axios.post(
        `${apiHostname}api/v1/i/token/access-token`,
        {
          authCode: code,
        }
      );
      return res.data;
    } catch (error) {
      console.log('[Callback] Cannot login', error);
      return null;
    }
  };
}
