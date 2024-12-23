import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as auth0 from "auth0-js";
import axios from "axios";
import { apiHostname, azureAdConf } from "src/config";
import { AppModelViewApi, UserInfoRes } from "./auth.model";
import axiosBuilder from "../axiosBuilder";

(window as any).global = window;

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    domain: `${azureAdConf.instance}${azureAdConf.tenantId}/oauth2/v2.0`,
    clientID: azureAdConf.clientId,
    redirectUri: azureAdConf.redirectUri,
    responseType: "code",
    responseMode: "query",
    scope: azureAdConf.scope,
    state: "12345",
  });
  isAuthenticated: boolean = false;
  apps: AppModelViewApi[] = [];
  account: UserInfoRes | null = null;

  constructor(private router: Router) {
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
      console.log("Get account", error);
    }
  }

  async getAppUser() {
    if (this.account !== null) return;
    try {
      const instance = axiosBuilder.getInstance(apiHostname);
      const res = await instance.get("/api/v1/i/account/me");
      this.account = res.data as UserInfoRes;
    } catch (error) {
      console.log("Get account", error);
    }
  }

  private async getAppsAsync(): Promise<AppModelViewApi[]> {
    if (this.apps.length == 0) {
      const instance = axiosBuilder.getInstance(apiHostname);
      const res = await instance.get("/api/v1/ap/apps");
      return res.data;
    }
    return this.apps;
  }

  private _setApps(_apps: AppModelViewApi[]) {
    this.apps = _apps;
  }

  get isLoggedIn(): boolean {
    this.isAuthenticated =
      window.localStorage.getItem("refresh_item") !== null ? true : false;
    return window.localStorage.getItem("refresh_token") !== null ? true : false;
  }
}
