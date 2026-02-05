import type { ANIM_CONFIG } from "../../types/anim.types";
import { MOBS_KEYS } from "../anim_keys";
import TEXTURE_NAMES from "../texture_names";

const MOBS_ANIM_CONFIGS: ANIM_CONFIG[] = [
  {
    key: MOBS_KEYS.GOBLIN,
    framesConfig: {
      sprite: TEXTURE_NAMES.MOBS,
      prefix: "goblin/",
      suffix: ".png",
      start: 1,
      end: 5,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: MOBS_KEYS.OGRE,
    framesConfig: {
      sprite: TEXTURE_NAMES.MOBS,
      prefix: "ogre/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 9,
    repeat: -1,
  },
  {
    key: MOBS_KEYS.BUG,
    framesConfig: {
      sprite: TEXTURE_NAMES.MOBS,
      prefix: "bug/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
];

export default MOBS_ANIM_CONFIGS;
