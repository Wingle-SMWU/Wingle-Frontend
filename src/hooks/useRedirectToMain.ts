import { useRouter } from "next/router";
import { useEffect } from "react";
import { getRefreshTokenFromLocalStorage } from "../utils/refreshTokenHandler";

export const useRedirectToMain = () => {
  const router = useRouter();
  console.log(router.pathname, router.query);
  useEffect(() => {
    if (
      router.pathname !== "/auth/login" &&
      router.pathname !== "/auth/signup"
    ) {
      const checkLogined = () => {
        const logined = getRefreshTokenFromLocalStorage();
        if (!logined) {
          alert("로그인이 필요합니다.");
          router.replace("/auth/login");
        }
      };
      checkLogined();
    }
  }, []);
};
