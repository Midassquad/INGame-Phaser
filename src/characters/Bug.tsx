import { MOBS_KEYS } from "../constants/anim_keys";
import TEXTURE_NAMES from "../constants/texture_names";
import type { Coordinates } from "../types/global.types";
import Unit from "./Unit";

export default class Bug extends Unit {
  constructor(
    scene: Phaser.Scene,
    scale: number,
    coords: Coordinates,
    defaultAnimation?: string,
  ) {
    super(
      scene,
      TEXTURE_NAMES.MOBS,
      scale,
      coords,
      defaultAnimation ?? MOBS_KEYS.BUG,
      true,
    );
  }

  configureHitAreaSize(): Phaser.Geom.Circle | void {
    return new Phaser.Geom.Circle(192 / 2, 192 / 2, 32);
  }
}
