import { CATTO_KEYS } from "../constants/anim_keys";
import TEXTURE_NAMES from "../constants/texture_names";
import Unit from "./Unit";

export default class Pet extends Unit {
  petScale: number;
  constructor(
    scene: Phaser.Scene,
    scale: number,
    coords: { x: number; y: number },
    defaultAnimation?: string,
    flipX?: boolean,
  ) {
    super(
      scene,
      TEXTURE_NAMES.CATTO,
      scale,
      coords,
      defaultAnimation ?? CATTO_KEYS.IDLE,
      flipX,
    );

    this.petScale = scale;
  }

  configureHitAreaSize(): Phaser.Geom.Circle | void {
    return new Phaser.Geom.Circle(192 / 2, 192 / 2, 44.8);
  }
}
