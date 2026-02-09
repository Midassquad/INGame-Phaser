import type { Scene } from "phaser";
import { BottomDrawer } from "./BottomDrawer";
import TEXTURE_NAMES from "../../constants/texture_names";
import { CATTO_KEYS } from "../../constants/anim_keys";

export class AIDialogBoxDrawer extends BottomDrawer {
  descriptionContainer!: Phaser.GameObjects.Container;
  catto!: Phaser.GameObjects.Sprite;

  descriptionBg!: Phaser.GameObjects.NineSlice;
  descriptionCopy!: Phaser.GameObjects.Text;

  paddingTopDescription: number; // this is the padding inside the dialog box
  paddingBottomDescription: number;

  message: string;

  constructor(
    scene: Scene,
    topPadding: number,
    bottomPadding: number,
    message: string,
  ) {
    super(scene, topPadding, bottomPadding);

    this.paddingTopDescription = 20; // default padding
    this.paddingBottomDescription = 20;
    this.message = message;
  }

  // Override
  setContent(): (
    | Phaser.GameObjects.Text
    | Phaser.GameObjects.Container
    | Phaser.GameObjects.Image
  )[] {
    this.catto = this.scene.add
      .sprite(this.sceneW / 1.8 / 2, -128 / 1.8, TEXTURE_NAMES.CATTO)
      .setFlipX(true)
      .setScale(1.8)
      .setDepth(999)
      .play(CATTO_KEYS.IDLE);

    this.descriptionContainer = this.scene.add.container(
      0,
      this.totalTopPadding,
    );

    this.descriptionBg = this.scene.add
      .nineslice(
        0,
        0,
        TEXTURE_NAMES.BROWN_BORDER_WHITE_BG,
        0,
        this.sceneW / 3 - 50 / 3, // we divide by 3 since we scale it, then we subtract 50 for padding, we also divide by 3 the 50 since we scaling
        (this.containerHeight / 3) * 0.87, // we divide by 3, then get the 85% of it
        10,
        10,
        10,
        10,
      )
      .setOrigin(0.5, 0) // put the origin point on the middle of X and at the top of Y
      .setScale(3);

    this.descriptionCopy = this.scene.add
      .text(
        -this.sceneW / 2 + 50, // left align formula, the '50' was the padding left/right
        this.paddingTopDescription,
        this.message,
      )
      .setStyle({
        fontSize: 26,
        fontFamily: "PixelifySans",
        fill: "#a3703a",
        align: "left",
        wordWrap: {
          width: this.sceneW - 100,
        },
      })
      .setOrigin(0, 0);

    this.setDescriptionBGSize();

    this.descriptionContainer.add(this.descriptionBg);
    this.descriptionContainer.add(this.descriptionCopy);
    this.descriptionContainer.add(this.catto);

    this.reAdjustHeight([this.descriptionBg]);

    return [this.descriptionContainer, this.catto];
  }

  reAdjustSpacing(): void {
    // let totalP: number = this.initialTopPadding;

    this.descriptionContainer.setY(this.initialTopPadding);

    this.descriptionCopy.setText(this.message);

    this.setDescriptionBGSize();

    // totalP += this.descriptionBg.height * 3 + 10;

    this.reAdjustHeight([this.descriptionBg]);

    if (this.isShowing) {
      this.container?.setY(
        this.sceneH - this.containerHeight - this.navbarHeight,
      );
    } else {
      this.container?.setY(
        this.sceneH + this.containerHeight + this.navbarHeight,
      );
    }

    this.mainBackgroundSprite.height = this.containerHeight / 3;
  }

  setPaddingTopDescription(padding: number): AIDialogBoxDrawer {
    this.paddingTopDescription = padding;
    return this;
  }

  setPaddingBottomDescription(padding: number): AIDialogBoxDrawer {
    this.paddingBottomDescription = padding;
    return this;
  }

  setMessage(message: string): AIDialogBoxDrawer {
    this.message = message;
    return this;
  }

  setDescriptionBGSize() {
    this.descriptionBg.setSize(
      this.sceneW / 3 - 50 / 3,
      (this.descriptionCopy.height +
        (this.paddingTopDescription + this.paddingBottomDescription)) /
        3,
    ); // adjust the size of the description background based on the height of description copy
  }
}
