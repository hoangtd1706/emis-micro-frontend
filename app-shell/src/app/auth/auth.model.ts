export type AppModelViewApi = {
  appName: string;
  appIcon: string;
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
};

export type AxiosRes<T> = {
  status: number;
  statusText: string;
  data: T;
};

export type TokenType = {
  token_type: string;
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
};

export type UserInfoRes = {
  employeeId: string;
  displayName: string;
};
