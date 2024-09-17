import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import axios, { Axios } from "axios";
import { apiHostname } from "src/config";
import { AxiosRes } from "../auth/auth.model";

export type TokenType = {
  token_type: string;
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
};

@Component({
  selector: "app-callback",
  templateUrl: "./callback.component.html",
})
export class CallbackComponent {
  loaders: any = [];
  code: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("Callback");
  }

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      if (params["code"] !== null) {
        try {
          this.getAccessToken(params["code"]).then((res) => {
            if (res !== null) {
              sessionStorage.setItem("access_token", res.access_token);
              localStorage.setItem("refresh_token", res.refresh_token);
              this.router.navigate(["/"]);
            }
          });
        } catch {
          sessionStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        } finally {
        }
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
      console.log("[Login] Login err", error);
      return null;
    }
  };
}
