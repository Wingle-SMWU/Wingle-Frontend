import { useRouter } from 'next/router';
import { PAGE_MOBILE_VER, PAGE_PC_VER } from '../constants/version';

export default function useAppVersion() {

  const router = useRouter();
  const page = router.pathname.split('/')[1];
  const version = PAGE_PC_VER.includes(page) 
                    ? 'pc' 
                    // : PAGE_MOBILE_VER.includes(page)
                      // ? 'mobile'
                      : 'mobile'
  return version;
}