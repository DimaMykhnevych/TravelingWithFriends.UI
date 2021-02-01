import { UserInfoService } from '../auth';

export function loadUserInfo(userInfoService: UserInfoService) {
  return () => userInfoService.loadUserInfo();
}
