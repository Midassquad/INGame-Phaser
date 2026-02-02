import type { ANIM_CONFIG } from "../../types/anim.types";
import { SKELETON_KEYS } from "../anim_keys";
import TEXTURE_NAMES from "../texture_names";

const SKELETON_WALK_CONFIGS: ANIM_CONFIG[] = [
  {
    key: SKELETON_KEYS.WALK_UP,
    framesConfig: {
      sprite: TEXTURE_NAMES.SKELETON,
      prefix: "walk/up/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: SKELETON_KEYS.WALK_DOWN,
    framesConfig: {
      sprite: TEXTURE_NAMES.SKELETON,
      prefix: "walk/left/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: SKELETON_KEYS.WALK_LEFT,
    framesConfig: {
      sprite: TEXTURE_NAMES.SKELETON,
      prefix: "walk/down/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: SKELETON_KEYS.WALK_RIGHT,
    framesConfig: {
      sprite: TEXTURE_NAMES.SKELETON,
      prefix: "walk/right/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
];

const SKELETON_SHOOT_CONFIGS: ANIM_CONFIG[] = [
  {
    key: SKELETON_KEYS.SHOOT_UP,
    framesConfig: {
      sprite: TEXTURE_NAMES.SKELETON,
      prefix: "shoot/up/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: SKELETON_KEYS.SHOOT_DOWN,
    framesConfig: {
      sprite: TEXTURE_NAMES.SKELETON,
      prefix: "shoot/left/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: SKELETON_KEYS.SHOOT_LEFT,
    framesConfig: {
      sprite: TEXTURE_NAMES.SKELETON,
      prefix: "shoot/down/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
  {
    key: SKELETON_KEYS.SHOOT_RIGHT,
    framesConfig: {
      sprite: TEXTURE_NAMES.SKELETON,
      prefix: "shoot/right/",
      suffix: ".png",
      start: 2,
      end: 9,
    },
    frameRate: 10,
    repeat: -1,
  },
];

const SKELETON_HURT_CONFIGS: ANIM_CONFIG[] = [
  {
    key: SKELETON_KEYS.HURT,
    framesConfig: {
      sprite: TEXTURE_NAMES.SKELETON,
      prefix: "hurt/up/",
      suffix: ".png",
      start: 2,
      end: 6,
    },
    frameRate: 10,
    repeat: -1,
  },
];

export { SKELETON_WALK_CONFIGS, SKELETON_SHOOT_CONFIGS, SKELETON_HURT_CONFIGS };
