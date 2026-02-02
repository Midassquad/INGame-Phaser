import { EventBus } from "../EventBus";
import { Animations, GameObjects, Scene } from "phaser";
import {
  GOLDEN_KNIGHT_KEYS,
  RATHALOS_HUNTER_KEYS,
  SKELETON_KEYS,
} from "../../constants/anim_keys.ts";
import Hero from "../../characters/Hero.tsx";
import Skeleton from "../../characters/Skeleton.tsx";
import TEXTURE_NAMES from "../../constants/texture_names.ts";
import { BottomDrawer } from "../ui/BottomDrawer.tsx";
import SCENE_NAMES from "../../constants/scene_names.ts";

export class Battle extends Scene {
  background: GameObjects.Image | undefined;

  hero: Hero | undefined;
  heroSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;

  isHeroNearAnEnemy: boolean;

  leftKey: Phaser.Input.Keyboard.Key | undefined;
  rightKey: Phaser.Input.Keyboard.Key | undefined;
  upKey: Phaser.Input.Keyboard.Key | undefined;
  downKey: Phaser.Input.Keyboard.Key | undefined;

  fKey: Phaser.Input.Keyboard.Key | undefined;

  constructor() {
    super(SCENE_NAMES.BATTLE);

    this.isHeroNearAnEnemy = false;
  }

  setupControllerListener() {
    EventBus.on("controls-pressed", (type: string) => {
      if (type === "attack") {
        this.hero?.attack();
      } else {
        this.hero?.walk(type);
      }
    });

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventBus.removeListener("controls-pressed");
    });
  }

  setupKeyboardEvents() {
    this.leftKey = this.input.keyboard?.addKey("LEFT");
    this.rightKey = this.input.keyboard?.addKey("RIGHT");
    this.upKey = this.input.keyboard?.addKey("UP");
    this.downKey = this.input.keyboard?.addKey("DOWN");

    this.fKey = this.input.keyboard?.addKey("F");

    this.leftKey?.on("down", () => this.hero?.walk("left"));
    this.rightKey?.on("down", () => this.hero?.walk("right"));
    this.upKey?.on("down", () => this.hero?.walk("up"));
    this.downKey?.on("down", () => this.hero?.walk("down"));

    // this.leftKey?.on("up", () => this.hero?.stop());
    // this.rightKey?.on("up", () => this.hero?.stop());
    // this.upKey?.on("up", () => this.hero?.stop());
    // this.downKey?.on("up", () => this.hero?.stop());

    this.fKey?.on("down", () => this.hero?.attack());
  }

  init() {
    this.setupControllerListener();
  }

  create() {
    const gameW = this.scale.width;
    const gameH = this.scale.height;

    this.background = this.add.image(0, 0, "background");
    this.background.setPosition(0, 0);
    this.background.setOrigin(0, 0);
    // this.background.setDisplaySize(gameH, gameH);

    this.hero = new Hero(
      this.physics.add.sprite(
        gameW / 2.7,
        gameH / 1.7,
        TEXTURE_NAMES.GOLDEN_KNIGHT,
      ),
      2,
      GOLDEN_KNIGHT_KEYS.SLASH_RIGHT,
      {
        up: GOLDEN_KNIGHT_KEYS.IDLE_UP,
        down: GOLDEN_KNIGHT_KEYS.IDLE_DOWN,
        left: GOLDEN_KNIGHT_KEYS.IDLE_LEFT,
        right: GOLDEN_KNIGHT_KEYS.IDLE_RIGHT,
      },
      {
        up: GOLDEN_KNIGHT_KEYS.WALK_UP,
        down: GOLDEN_KNIGHT_KEYS.WALK_DOWN,
        left: GOLDEN_KNIGHT_KEYS.WALK_LEFT,
        right: GOLDEN_KNIGHT_KEYS.WALK_RIGHT,
      },
      {
        up: GOLDEN_KNIGHT_KEYS.SLASH_UP,
        down: GOLDEN_KNIGHT_KEYS.SLASH_DOWN,
        left: GOLDEN_KNIGHT_KEYS.SLASH_LEFT,
        right: GOLDEN_KNIGHT_KEYS.SLASH_RIGHT,
      },
    );

    this.physics.add
      .sprite(gameW / 2.5, gameH / 2.2, TEXTURE_NAMES.RATHALOS_HUNTER)
      .setScale(2)
      .play(RATHALOS_HUNTER_KEYS.IDLE);

    this.physics.add
      .sprite(gameW / 2.5, gameH / 2.7, TEXTURE_NAMES.RATHALOS_HUNTER)
      .setScale(2)
      .play(RATHALOS_HUNTER_KEYS.WALK);

    this.physics.add
      .sprite(gameW / 2.5, gameH / 3.9, TEXTURE_NAMES.RATHALOS_HUNTER)
      .setScale(2)
      .play(RATHALOS_HUNTER_KEYS.SLASH);

    this.setupKeyboardEvents();

    const mobsContainer = this.add.container(gameW / 1.8, gameH / 2.7);

    mobsContainer.add(
      new Skeleton(
        this.physics.add.sprite(0, 0, TEXTURE_NAMES.SKELETON),
        2,
        SKELETON_KEYS.SHOOT_LEFT,
      ).getSprite(),
    );

    mobsContainer.add(
      new Skeleton(
        this.physics.add.sprite(0, 0, TEXTURE_NAMES.SKELETON),
        2,
        SKELETON_KEYS.SHOOT_LEFT,
      ).getSprite(),
    );

    mobsContainer.add(
      new Skeleton(
        this.physics.add.sprite(0, 0, TEXTURE_NAMES.SKELETON),
        2,
        SKELETON_KEYS.WALK_LEFT,
      ).getSprite(),
    );

    mobsContainer.add(
      new Skeleton(
        this.physics.add.sprite(0, 0, TEXTURE_NAMES.SKELETON),
        2,
        SKELETON_KEYS.WALK_LEFT,
      ).getSprite(),
    );

    mobsContainer.add(
      new Skeleton(
        this.physics.add.sprite(0, 0, TEXTURE_NAMES.SKELETON),
        2,
        SKELETON_KEYS.SHOOT_LEFT,
      ).getSprite(),
    );

    Phaser.Actions.GridAlign(mobsContainer.list, {
      width: 3,
      height: 3,
      cellWidth: 32 + 50,
      cellHeight: 32 + 80,
      x: 0,
      y: 0,
    });

    // new Skeleton(
    //   this.physics.add.sprite(gameW / 1.2, gameH / 2.2, TEXTURE_NAMES.SKELETON),
    //   2,
    //   SKELETON_KEYS.SHOOT_LEFT,
    // );
    //
    // new Skeleton(
    //   this.physics.add.sprite(gameW / 1.6, gameH / 2.2, TEXTURE_NAMES.SKELETON),
    //   2,
    //   SKELETON_KEYS.WALK_LEFT,
    // );
    //
    // new Skeleton(
    //   this.physics.add.sprite(gameW / 1.4, gameH / 2.6, TEXTURE_NAMES.SKELETON),
    //   2,
    //   SKELETON_KEYS.WALK_LEFT,
    // );

    // this.heroSprite.on(
    //   Phaser.Animations.Events.ANIMATION_REPEAT,
    //   (e: Animations.Animation) => this.onHit(e, damage, attackKey),
    // );
    //

    const bottomDrawer = new BottomDrawer(this);

    bottomDrawer.init();

    EventBus.emit("current-scene-ready", this);
  }

  onHit(e: Animations.Animation, damage: number, attackKey: string) {
    if (e.key.includes(attackKey)) {
      if (this.isHeroNearAnEnemy) {
        console.log("HIT!", damage);
      } else {
        console.log("MISS!");
      }
    }
  }

  update() {
    // const heroCoor: { x: number; y: number } = this.hero!.getCoordinates();
    // const distance = Phaser.Math.Distance.Between(
    //   heroCoor.x,
    //   heroCoor.y,
    //   this.skeleton.x,
    //   this.skeleton.y,
    // );
    //
    // if (distance > 200) {
    //   // far away, miss the attack
    //   this.isHeroNearAnEnemy = false;
    // } else {
    //   // near, damage it!!
    //   //
    //   this.isHeroNearAnEnemy = true;
    // }
  }
}
