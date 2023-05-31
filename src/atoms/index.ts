import { atom } from 'recoil';
import { AVATAR_MODE } from '../enum';

/**
 * 현재 상태에 따라, 다른 애니메이션을 보여주기 위한 state
 */
export const avatarModeAtom = atom<AVATAR_MODE>({
	key: 'avatarModeAtom',
	default: AVATAR_MODE.WAIT,
});
