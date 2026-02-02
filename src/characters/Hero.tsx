import { Physics } from "phaser";

interface directions {
  up: string;
  down: string;
  left: string;
  right: string;
  [key: string]: string;
}

export default class Hero {
  #heroSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  #isAttacking: boolean;
  #currentDirection: string;

  #idleAnimations: directions;
  #walkAnimations: directions;
  #attackAnimations: directions;

  #damage: number;

  constructor(
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    scale: number,
    defaultAnim: string,
    idleAnimations: directions,
    walkAnimations: directions,
    attackAnimations: directions,
  ) {
    this.#heroSprite = sprite;
    this.#heroSprite.setScale(scale).refreshBody();
    this.#heroSprite.setCollideWorldBounds(true);
    this.#heroSprite.setSize(30, 60);
    this.#heroSprite.setOffset(16, 0);

    this.#isAttacking = false;
    this.#currentDirection = "right";

    this.#heroSprite.play(defaultAnim);
    this.#walkAnimations = walkAnimations;
    this.#attackAnimations = attackAnimations;
    this.#idleAnimations = idleAnimations;
    this.#damage = 20;
  }

  moveSprite(direction: string) {
    switch (direction) {
      case "down":
        this.#heroSprite?.setVelocity(0, 160);
        break;
      case "up":
        this.#heroSprite?.setVelocity(0, -160);
        break;
      case "left":
        this.#heroSprite?.setVelocity(-160, 0);
        break;
      case "right":
        this.#heroSprite?.setVelocity(160, 0);
        break;
      default:
        break;
    }
  }

  stopSprite() {
    this.#heroSprite?.setVelocity(0);
  }

  walk(keyDirection: string) {
    if (this.#isAttacking) {
      this.#isAttacking = false;
    }

    this.#heroSprite.setOffset(16, 0);
    this.#heroSprite?.play(this.#walkAnimations[keyDirection]);
    this.moveSprite(keyDirection);
    this.#currentDirection = keyDirection;
  }

  attack() {
    this.stopSprite();
    if (this.#isAttacking) {
      this.#heroSprite?.stop();

      this.#heroSprite.setOffset(16, 0);
      this.#heroSprite.play(this.#idleAnimations[this.#currentDirection]);

      this.#isAttacking = false;
    } else {
      this.#isAttacking = true;
      this.#heroSprite.setOffset(80, 64);
      this.#heroSprite?.play(this.#attackAnimations[this.#currentDirection]);
    }
  }

  stop() {
    this.#heroSprite.anims.stopAfterRepeat(0);
    this.#heroSprite?.setVelocity(0);
  }

  getSprites(): Physics.Arcade.Sprite {
    return this.#heroSprite;
  }

  getSpriteDetails(): {
    heroSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    damage: number;
  } {
    return {
      heroSprite: this.#heroSprite,
      damage: this.#damage,
    };
  }
}
