import type { ANIM_CONFIG } from "../../types/anim.types";
import { GOLDEN_KNIGHT_KEYS } from "../anim_keys";
import TEXTURE_NAMES from "../texture_names";

const GOLDEN_KNIGHT_WALK_CONFIGS: ANIM_CONFIG[] = [
  {
    key: GOLDEN_KNIGHT_KEYS.WALK_UP,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "walk/up/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: GOLDEN_KNIGHT_KEYS.WALK_DOWN,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "walk/left/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: GOLDEN_KNIGHT_KEYS.WALK_LEFT,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "walk/down/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: GOLDEN_KNIGHT_KEYS.WALK_RIGHT,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "walk/right/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
];

const GOLDEN_KNIGHT_SLASH_CONFIGS: ANIM_CONFIG[] = [
  {
    key: GOLDEN_KNIGHT_KEYS.SLASH_UP,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "slash_oversize/up/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: GOLDEN_KNIGHT_KEYS.SLASH_DOWN,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "slash_oversize/down/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: GOLDEN_KNIGHT_KEYS.SLASH_LEFT,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "slash_oversize/left/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: GOLDEN_KNIGHT_KEYS.SLASH_RIGHT,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "slash_oversize/right/",
      suffix: ".png",
      start: 1,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
];

const GOLDEN_KNIGHT_IDLE_CONFIGS: ANIM_CONFIG[] = [
  {
    key: GOLDEN_KNIGHT_KEYS.IDLE_UP,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "idle/up/",
      suffix: ".png",
      start: 1,
      end: 2,
    },
    frameRate: 3,
    repeat: -1,
  },
  {
    key: GOLDEN_KNIGHT_KEYS.IDLE_DOWN,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "idle/left/",
      suffix: ".png",
      start: 1,
      end: 2,
    },
    frameRate: 3,
    repeat: -1,
  },
  {
    key: GOLDEN_KNIGHT_KEYS.IDLE_LEFT,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "idle/down/",
      suffix: ".png",
      start: 1,
      end: 2,
    },
    frameRate: 3,
    repeat: -1,
  },
  {
    key: GOLDEN_KNIGHT_KEYS.IDLE_RIGHT,
    framesConfig: {
      sprite: TEXTURE_NAMES.GOLDEN_KNIGHT,
      prefix: "idle/right/",
      suffix: ".png",
      start: 1,
      end: 2,
    },
    frameRate: 3,
    repeat: -1,
  },
];

export {
  GOLDEN_KNIGHT_WALK_CONFIGS,
  GOLDEN_KNIGHT_SLASH_CONFIGS,
  GOLDEN_KNIGHT_IDLE_CONFIGS,
};
