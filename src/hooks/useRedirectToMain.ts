import { useRouter } from "next/router";
import { useEffect } from "react";
import { getRefreshTokenFromLocalStorage } from "../utils/refreshTokenHandler";

export const useRedirectToMain = (): void => {
  const router = useRouter();

  useEffect(() => {
    const isAuthPage = router.pathname.includes("/auth");
    const isAdminPage = router.pathname.includes("/admin");
    const logined = getRefreshTokenFromLocalStorage();
    console.log(!!logined);

    if (!isAuthPage && !isAdminPage && !logined) {
      alert("로그인이 필요합니다.");
      router.replace("/auth/login");
    }

    if ((isAuthPage || isAdminPage) && !!logined) {
      router.replace("/community");
    }
  }, [router.pathname]);
};
