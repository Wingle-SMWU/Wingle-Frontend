export const saveRefreshTokenToLocalStorage = (refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const getRefreshTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken") || "";
  }
};
