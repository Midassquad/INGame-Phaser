import { Scene } from "phaser";
import Golden_Knight from "../../characters/Golden_Knight.tsx";
import { EventBus } from "../EventBus.tsx";
import {
  CHAR_KEYS,
  DER_KEYS,
  RATHALOS_HUNTER_KEYS,
} from "../../constants/anim_keys.ts";
import TEXTURE_NAMES from "../../constants/texture_names.ts";
import SCENE_NAMES from "../../constants/scene_names.ts";
import Pet from "../../characters/Pet.tsx";
import type { GameData, Quest } from "../../types/global.types.ts";
import { JEAN_ANIM_CONFIGS } from "../../constants/anim_configs/char_anim_configs.ts";

export class CharacterDetails extends Scene {
  hero: Golden_Knight | undefined;
  isShowing: boolean;
  quests: Quest[] | undefined;
  userName: string;

  constructor() {
    super(SCENE_NAMES.CHARACTER_DETAILS);

    this.isShowing = false;
  }

  init(gameData: GameData) {
    this.quests = gameData.quests;
    this.userName = gameData.username;
  }

  create() {
    const gameW = this.scale.width;
    const gameH = this.scale.height;

    this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      TEXTURE_NAMES.FOREST,
    );

    // this.add
    //   .nineslice(
    //     this.scale.width / 2,
    //     this.scale.height / 2,
    //     TEXTURE_NAMES.BLUE_BORDER_WHITE_BG,
    //     0,
    //     500 / 2.5,
    //     200 / 2.5,
    //     20,
    //     20,
    //     20,
    //     20,
    //   )
    //   .setScale(2.5);

    this.add.image(gameW / 2, gameH / 2, TEXTURE_NAMES.DER_SIT).setScale(1.7);

    // this.physics.add
    //   .sprite(gameW / 2, gameH / 2, TEXTURE_NAMES.DER)
    //   .setScale(3.5)
    //   .play(DER_KEYS.WALK);

    this.add
      .image(gameW / 2, (gameH * 0.32) / 2, TEXTURE_NAMES.LOGO)
      .setScale(1);

    this.add
      .text(gameW / 2, gameH / 1.7, `${this.userName}`)
      .setStyle({
        fontSize: 40,
        fontFamily: "PixelifySans",
        fontStyle: "bold",
        fill: "white",
        align: "center",
        wordWrap: {
          width: gameW - 100,
        },
      })
      .setStroke("black", 3)
      .setOrigin(0.5, 0);

    new Pet(this, 0.9, { x: gameW / 3, y: gameH / 1.9 });

    EventBus.emit("current-scene-ready", this);
  }
}
