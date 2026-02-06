import { GameObjects, Scene } from "phaser";
import SCENE_NAMES from "../../constants/scene_names.ts";
import TEXTURE_NAMES from "../../constants/texture_names.ts";

export class SplashScreen extends Scene {
  background: GameObjects.Image | undefined;

  constructor() {
    super(SCENE_NAMES.SPLASH_SCREEN);
  }

  init() {}

  create() {
    // Add background image
    const bg = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      TEXTURE_NAMES.SPLASH_SCREEN_BG,
    );

    // Scale background to fit the screen
    const scaleX = 720 / bg.width;
    const scaleY = 1280 / bg.height;
    const scale = Math.max(scaleX, scaleY);
    bg.setScale(scale);

    // Add logo in the center
    const logo = this.add.image(
      this.scale.width / 2,
      this.scale.height / 3,
      TEXTURE_NAMES.LOGO,
    );

    // Scale logo if needed (adjust this value to make logo bigger/smaller)
    logo.setScale(1);

    // Add a fade-in effect to the logo
    logo.setAlpha(0);
    this.tweens.add({
      targets: logo,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
    });

    // Add a subtle scale pulse animation to the logo
    this.tweens.add({
      targets: logo,
      scale: 1.05,
      duration: 1500,
      yoyo: true,
      repeat: 1,
      ease: "Sine.easeInOut",
    });

    // Transition to main menu after 3 seconds
    this.time.delayedCall(2000, () => {
      this.cameras.main.fadeOut(300, 0, 0, 0);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.scene.start(SCENE_NAMES.LOGIN_SCREEN);
      });
    });
  }

  update() {}
}
