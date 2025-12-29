import { UserManager } from "oidc-client-ts";

const oidcConfig = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  silent_redirect_uri: import.meta.env.VITE_OIDC_SILENT_REDIRECT_URI,
  post_logout_redirect_uri: import.meta.env.VITE_OIDC_LOGOUT_REDIRECT_URI,
  response_type: "code",
  scope: "openid profile email",
  automaticSilentRenew: true,
};


if (!oidcConfig.authority || !oidcConfig.client_id) {
  throw new Error("OIDC configuration missing");
}

class AuthService {
  userManager = new UserManager(oidcConfig);

  getUser() {
    return this.userManager.getUser();
  }

  async getAccessToken() {
    const user = await this.getUser();
    return user?.access_token;
  }

  signIn() {
    return this.userManager.signinRedirect();
  }

  signOut() {
    return this.userManager.signoutRedirect();
  }

  handleCallback() {
    return this.userManager.signinRedirectCallback();
  }

  handleSilentRenew() {
    return this.userManager.signinSilentCallback();
  }
}

export default new AuthService();
