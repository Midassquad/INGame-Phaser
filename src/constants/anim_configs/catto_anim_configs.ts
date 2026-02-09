import type { ANIM_CONFIG } from "../../types/anim.types";
import { CATTO_KEYS } from "../anim_keys";
import TEXTURE_NAMES from "../texture_names";

const CATTO_ANIM_CONFIGS: ANIM_CONFIG[] = [
  {
    key: CATTO_KEYS.IDLE,
    framesConfig: {
      sprite: TEXTURE_NAMES.CATTO,
      prefix: "idle/idle_",
      suffix: ".png",
      start: 1,
      end: 7,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: CATTO_KEYS.JUMP,
    framesConfig: {
      sprite: TEXTURE_NAMES.CATTO,
      prefix: "jump/jump_",
      suffix: ".png",
      start: 1,
      end: 7,
    },
    frameRate: 10,
    repeat: -1,
  },
];

export default CATTO_ANIM_CONFIGS;
