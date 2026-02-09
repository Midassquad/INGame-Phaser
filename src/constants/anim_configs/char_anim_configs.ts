import type { ANIM_CONFIG } from "../../types/anim.types";
import { CHAR_KEYS } from "../anim_keys";
import TEXTURE_NAMES from "../texture_names";

const JEAN_ANIM_CONFIGS: ANIM_CONFIG[] = [
  {
    key: CHAR_KEYS.JEAN.WALK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "jean/walk/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: CHAR_KEYS.JEAN.ATTACK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "jean/attack/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
];

const GAREN_ANIM_CONFIGS: ANIM_CONFIG[] = [
  {
    key: CHAR_KEYS.GAREN.WALK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "garen/walk/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: CHAR_KEYS.GAREN.ATTACK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "garen/attack/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
];

const CIRI_ANIM_CONFIGS: ANIM_CONFIG[] = [
  {
    key: CHAR_KEYS.CIRI.WALK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "ciri/walk/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: CHAR_KEYS.CIRI.ATTACK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "ciri/attack/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
];

const DK_ANIM_CONFIGS: ANIM_CONFIG[] = [
  {
    key: CHAR_KEYS.DK.WALK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "dragon_knight/walk/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: CHAR_KEYS.DK.ATTACK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "dragon_knight/attack/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
];

const MK_ANIM_CONFIGS: ANIM_CONFIG[] = [
  {
    key: CHAR_KEYS.MK.WALK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "midas_knight/walk/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: CHAR_KEYS.MK.ATTACK,
    framesConfig: {
      sprite: TEXTURE_NAMES.CHARACTERS,
      prefix: "midas_knight/attack/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
];

export {
  JEAN_ANIM_CONFIGS,
  GAREN_ANIM_CONFIGS,
  CIRI_ANIM_CONFIGS,
  DK_ANIM_CONFIGS,
  MK_ANIM_CONFIGS,
};
