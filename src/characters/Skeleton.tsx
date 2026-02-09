import { SKELETON_KEYS } from "../constants/anim_keys";
import TEXTURE_NAMES from "../constants/texture_names";
import type { Coordinates } from "../types/global.types";
import Unit from "./Unit";

export default class Skeleton extends Unit {
  constructor(
    scene: Phaser.Scene,
    scale: number,
    coords: Coordinates,
    defaultAnimation?: string,
  ) {
    super(
      scene,
      TEXTURE_NAMES.SKELETON,
      scale,
      coords,
      defaultAnimation ?? SKELETON_KEYS.SHOOT_LEFT,
    );
  }
}
