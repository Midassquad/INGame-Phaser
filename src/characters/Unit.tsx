export default class Unit {
  #scene: Phaser.Scene;
  #sprite: Phaser.Physics.Arcade.Sprite;
  #defaultAnimation: string;
  hitAreaShape: Phaser.Geom.Circle;
  tweenBlinking: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    texture: string,
    scale: number,
    coords: { x: number; y: number },
    defaultAnimation?: string,
    flipX?: boolean,
  ) {
    this.#scene = scene;
    this.hitAreaShape = new Phaser.Geom.Circle(64 / 2, 64 / 2, 32); // default

    const customShape = this.configureHitAreaSize();
    if (customShape) {
      this.hitAreaShape = customShape;
    }

    this.#sprite = this.#scene.physics.add
      .sprite(coords.x, coords.y, texture)
      .setScale(scale)
      .setInteractive({
        cursor: "pointer",
        hitArea: this.hitAreaShape,
        hitAreaCallback: Phaser.Geom.Circle.Contains,
      });

    if (flipX) {
      this.#sprite.setFlipX(true);
    }

    this.#defaultAnimation = defaultAnimation ?? "";

    this.#init();
  }

  configureHitAreaSize(): Phaser.Geom.Circle | void {}

  #init() {
    this.#sprite.play(this.#defaultAnimation);
  }

  target() {
    // this.#sprite.setTint(0xff0000);
    // this.#sprite.setTint(0xff00ff, 0xff0000, 0x00ff00, 0x0000ff);

    this.tweenBlinking = this.#scene.tweens.add({
      targets: this.#sprite,
      ease: "sine",
      repeat: -1,
      duration: 200,
      alpha: 0,
      yoyo: true,
    });
  }

  unTarget() {
    this.#sprite.clearTint();
    this.tweenBlinking.remove();

    this.#sprite.setAlpha(1);
  }

  getSprite():
    | Phaser.Physics.Arcade.Sprite
    | Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this.#sprite;
  }
}
