import type { ANIM_CONFIG } from "../../types/anim.types";
import { RATHALOS_HUNTER_KEYS } from "../anim_keys";
import TEXTURE_NAMES from "../texture_names";

const RATHALOS_ANIM_CONFIGS: ANIM_CONFIG[] = [
  {
    key: RATHALOS_HUNTER_KEYS.IDLE,
    framesConfig: {
      sprite: TEXTURE_NAMES.RATHALOS_HUNTER,
      prefix: "idle/idle_",
      suffix: ".png",
      start: 1,
      end: 2,
    },
    frameRate: 3,
    repeat: -1,
  },
  {
    key: RATHALOS_HUNTER_KEYS.WALK,
    framesConfig: {
      sprite: TEXTURE_NAMES.RATHALOS_HUNTER,
      prefix: "walk/walk_",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: RATHALOS_HUNTER_KEYS.SLASH,
    framesConfig: {
      sprite: TEXTURE_NAMES.RATHALOS_HUNTER,
      prefix: "slash/slash_",
      suffix: ".png",
      start: 1,
      end: 5,
    },
    frameRate: 10,
    repeat: -1,
  },
];

export default RATHALOS_ANIM_CONFIGS;
