import { Scene } from "phaser";
import Golden_Knight from "../../characters/Golden_Knight.tsx";
import { EventBus } from "../EventBus.tsx";
import { RATHALOS_HUNTER_KEYS } from "../../constants/anim_keys.ts";
import TEXTURE_NAMES from "../../constants/texture_names.ts";
import SCENE_NAMES from "../../constants/scene_names.ts";
import Pet from "../../characters/Pet.tsx";

export class CharacterDetails extends Scene {
  hero: Golden_Knight | undefined;
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

    this.add
      .nineslice(
        this.scale.width / 2,
        this.scale.height / 2,
        TEXTURE_NAMES.BLUE_BORDER_WHITE_BG,
        0,
        500 / 2.5,
        500 / 2.5,
        20,
        20,
        20,
        20,
      )
      .setScale(2.5);

    this.physics.add
      .sprite(gameW / 2, gameH / 2, TEXTURE_NAMES.RATHALOS_HUNTER)
      .setScale(3.5)
      .play(RATHALOS_HUNTER_KEYS.IDLE);

    this.add
      .image(gameW / 2, (gameH * 0.32) / 2, TEXTURE_NAMES.LOGO)
      .setScale(1);

    this.add
      .text(gameW / 2, gameH / 3, "Elton J.")
      .setStyle({
        fontSize: 40,
        fontStyle: "bold",
        fontFamily: "PixelifySans",
        fill: "#a3703a",
        align: "left",
        wordWrap: {
          width: gameW - 100,
        },
      })
      .setOrigin(0.5, 0);

    this.add
      .text(gameW / 2, gameH / 1.7, "DRAGON KNIGHT")
      .setStyle({
        fontSize: 32,
        fontFamily: "PixelifySans",
        fill: "#a3703a",
        align: "left",
        wordWrap: {
          width: gameW - 100,
        },
      })
      .setOrigin(0.5, 0);
    this.add
      .text(gameW / 2, gameH / 1.62, "Lv. 69")
      .setStyle({
        fontSize: 32,
        fontFamily: "PixelifySans",
        fill: "#a3703a",
        align: "left",
        wordWrap: {
          width: gameW - 100,
        },
      })
      .setOrigin(0.5, 0);

    new Pet(this, 0.9, { x: gameW / 3, y: gameH / 1.9 });

    EventBus.emit("current-scene-ready", this);
  }
}
