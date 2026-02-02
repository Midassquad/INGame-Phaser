import { SKELETON_KEYS } from "../constants/anim_keys";

export default class Skeleton {
  #skeletonSprite: Phaser.Physics.Arcade.Sprite;
  #scale: number;
  #defaultAnimation: string;

  constructor(
    sprite: Phaser.Physics.Arcade.Sprite,
    scale: number,
    defaultAnimation: string,
  ) {
    this.#skeletonSprite = sprite;
    this.#scale = scale;
    this.#defaultAnimation = defaultAnimation;

    this.#init();
  }

  #init() {
    this.#skeletonSprite.setScale(this.#scale);
    this.#skeletonSprite.play(this.#defaultAnimation);
  }

  shoot(direction: string) {
    let animKey = SKELETON_KEYS.SHOOT_DOWN;
    switch (direction) {
      case "up":
        animKey = SKELETON_KEYS.SHOOT_UP;
        break;

      case "down":
        animKey = SKELETON_KEYS.SHOOT_DOWN;
        break;

      case "left":
        animKey = SKELETON_KEYS.SHOOT_LEFT;
        break;

      case "right":
        animKey = SKELETON_KEYS.SHOOT_RIGHT;
        break;
      default:
        break;
    }
    this.#skeletonSprite.play(animKey);
  }

  getSprite(): Phaser.Physics.Arcade.Sprite {
    return this.#skeletonSprite;
  }
}
