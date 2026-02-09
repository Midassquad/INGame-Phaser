import type { ANIM_CONFIG } from "../../types/anim.types";
import { DER_KEYS } from "../anim_keys";
import TEXTURE_NAMES from "../texture_names";

const DER_ANIM_CONFIGS: ANIM_CONFIG[] = [
  {
    key: DER_KEYS.ATTACK,
    framesConfig: {
      sprite: TEXTURE_NAMES.DER,
      prefix: "der/attack/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: DER_KEYS.WALK,
    framesConfig: {
      sprite: TEXTURE_NAMES.DER,
      prefix: "der/walk/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
];

export default DER_ANIM_CONFIGS;
