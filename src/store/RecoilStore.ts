import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const imageState = atom({
  key: "imageState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const carouselInterval = atom({
  key: "carouselInterval",
  default: 4000,
  effects_UNSTABLE: [persistAtom],
});

export const carouselPlayState = atom({
  key: "carouselPlayState",
  default: true,
});
