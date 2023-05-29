import { atom } from "recoil";
import { AVATAR_MODE } from "../enum";

export const avatarModeAtom = atom<AVATAR_MODE>({
  key: "avatarModeAtom",
  default: AVATAR_MODE.WAIT,
});
