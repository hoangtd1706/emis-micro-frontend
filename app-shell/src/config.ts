export const azureAdConf = {
  instance: process.env['REACT_APP_AZURE_INSTANCE'] ?? '',
  clientId: process.env['REACT_APP_AZURE_CLIENT_ID'] ?? '',
  scope: process.env['REACT_APP_AZURE_SCOPE'] ?? '',
  redirectUri: process.env['REACT_APP_AZURE_REDIRECT_URI'] ?? '',
  tenantId: process.env['REACT_APP_AZURE_TENANT_ID'] ?? '',
};

export const apiHostname = process.env['REACT_APP_API_HOSTNAME'] ?? '';
