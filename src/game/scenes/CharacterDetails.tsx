import { Scene } from "phaser";
import Hero from "../../characters/Hero.tsx";
import { EventBus } from "../EventBus.tsx";
import { GOLDEN_KNIGHT_KEYS } from "../../constants/anim_keys.ts";
import TEXTURE_NAMES from "../../constants/texture_names.ts";
import SCENE_NAMES from "../../constants/scene_names.ts";

export class CharacterDetails extends Scene {
  hero: Hero | undefined;
  isShowing: boolean;

  constructor() {
    super(SCENE_NAMES.CHARACTER_DETAILS);

    this.isShowing = false;
  }

  create() {
    this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      TEXTURE_NAMES.HERO_BG,
    );

    const gameW = this.scale.width;
    const gameH = this.scale.height;

    this.hero = new Hero(
      this.physics.add.sprite(
        gameW / 2,
        gameH / 1.5,
        TEXTURE_NAMES.GOLDEN_KNIGHT,
      ),
      4,
      GOLDEN_KNIGHT_KEYS.IDLE_DOWN,
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

    EventBus.emit("current-scene-ready", this);
  }
}
