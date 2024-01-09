import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import axios from 'axios';
import { apiHostname, azureAdConf } from 'src/config';
import {
  AppModelViewApi,
  AxiosRes,
  TokenType,
  UserInfoRes,
} from './auth.model';
import axiosBuilder from '../axiosBuilder';

(window as any).global = window;

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    domain: `${azureAdConf.instance}${azureAdConf.tenantId}/oauth2/v2.0`,
    clientID: azureAdConf.clientId,
    redirectUri: azureAdConf.redirectUri,
    responseType: 'code',
    responseMode: 'query',
    scope: azureAdConf.scope,
    state: '12345',
  });
  isAuthenticated: boolean = false;
  apps: AppModelViewApi[] = [];
  account: UserInfoRes | null = null;

  constructor(private router: Router) {
    this.getAuthentication();
    if (this.isLoggedIn) {
      this.getApps();
      this.getAppUser();
    }
  }

  login() {
    this.auth0.authorize();
  }

  logout() {}

  async getApps() {
    try {
      const data = await this.getAppsAsync();
      this._setApps(data);
    } catch (error) {
      console.log('Get account', error);
    }
  }

  async getAppUser() {
    try {
      const instance = axiosBuilder.getInstance(apiHostname);
      const res = await instance.get('/api/v1/i/account/me');
      this.account = res.data as UserInfoRes;
    } catch (error) {
      console.log('Get account', error);
    }
  }

  private async getAppsAsync(): Promise<AppModelViewApi[]> {
    const instance = axiosBuilder.getInstance(apiHostname);
    const res = await instance.get('/api/v1/ap/apps');
    return res.data;
  }

  getAuthentication() {
    this.isAuthenticated =
      window.localStorage.getItem('refresh_item') !== null ? true : false;
  }

  async handleLoginCallback(code: string) {
    try {
      const res = await this.getAccessToken(code);
      this._setSessionLogin();
      sessionStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      this.getAppUser();
    } catch {
      sessionStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } finally {
      this.router.navigate(['/']);
    }
  }

  private getAccessToken = (code: string): Promise<AxiosRes<TokenType>> => {
    return axios.post(`${apiHostname}api/v1/i/token/access-token`, {
      authCode: code,
    });
  };

  private _setApps(_apps: AppModelViewApi[]) {
    this.apps = _apps;
  }

  private _setSessionLogin() {
    this.isAuthenticated = true;
  }

  get isLoggedIn(): boolean {
    return window.localStorage.getItem('refresh_token') !== null ? true : false;
  }
}
