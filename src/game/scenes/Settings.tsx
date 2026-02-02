import { Scene } from "phaser";
import SCENE_NAMES from "../../constants/scene_names";
import { EventBus } from "../EventBus";
import TEXTURE_NAMES from "../../constants/texture_names";

export class Settings extends Scene {
  constructor() {
    super(SCENE_NAMES.SETTINGS);
  }

  create() {
    const gameW = this.scale.width;
    const gameH = this.scale.height;

    const navbarHeight = this.scale.height * 0.18;

    const containerSettings = this.add
      .container(gameW / 2, navbarHeight - 50 - gameH)
      .setAlpha(0);

    const bgModal = this.add
      .nineslice(
        0,
        0,
        TEXTURE_NAMES.BLUE_BORDER_BLUE_BG_NO_DESIGN,
        0,
        (gameW - 30) / 3,
        (gameH - navbarHeight - 120) / 3,
        14,
        14,
        14,
        14,
      )
      .setOrigin(0.5, 0)
      .setScale(3);

    containerSettings.add(bgModal);

    const title = this.add
      .text(0, 50, "SETTINGS")
      .setStyle({
        fontSize: 50,
        fontFamily: "PixelifySans",
        fill: "white",
        align: "center",
      })
      .setStroke("black", 3)
      .setOrigin(0.5, 0);

    containerSettings.add(title);

    this.tweens.add({
      targets: containerSettings,
      ease: "Sine",
      delay: 50,
      repeat: 0,
      repeatDelay: 2000,
      duration: 200,
      alpha: 1,
      y: navbarHeight + 50,
      // onComplete: () => (this.#isShowing = true),
    });

    EventBus.emit("current-scene-ready", this);
  }
}
