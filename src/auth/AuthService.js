const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const AuthService = {
  setTokens: (loginApiResponse) => {
    const data = loginApiResponse?.data || loginApiResponse;

    if (data?.accessToken) {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    }
    if (data?.refreshToken) {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    }
  },

  getAccessToken: () => sessionStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => sessionStorage.getItem(REFRESH_TOKEN_KEY),

  clearTokens: () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  logout: () => {
    AuthService.clearTokens();
    window.location.href = "/login";
  },
};

export default AuthService;
