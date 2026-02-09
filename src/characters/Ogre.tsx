import { MOBS_KEYS } from "../constants/anim_keys";
import TEXTURE_NAMES from "../constants/texture_names";
import Unit from "./Unit";

export default class Ogre extends Unit {
  constructor(
    scene: Phaser.Scene,
    scale: number,
    coords: { x: number; y: number },
    defaultAnimation?: string,
  ) {
    super(
      scene,
      TEXTURE_NAMES.MOBS,
      scale,
      coords,
      defaultAnimation ?? MOBS_KEYS.OGRE,
      true,
    );
  }

  configureHitAreaSize(): Phaser.Geom.Circle | void {
    return new Phaser.Geom.Circle(192 / 2, 192 / 2, 32);
  }
}
