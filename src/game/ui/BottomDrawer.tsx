import type { Scene } from "phaser";
import TEXTURE_NAMES from "../../constants/texture_names";

export class BottomDrawer {
  scene: Scene;
  container?: Phaser.GameObjects.Container;

  sceneW: number;
  sceneH: number;

  containerHeight: number;

  navbarHeight: number;

  mainBackgroundSprite!: Phaser.GameObjects.NineSlice;

  initialTopPadding: number;
  totalTopPadding: number; // compute the total top padding so that the contents below go down
  bottomPadding: number;

  isShowing: boolean;

  constructor(scene: Scene, topPadding: number, bottomPadding: number) {
    this.scene = scene;
    this.sceneW = scene.scale.width;
    this.sceneH = scene.scale.height;
    this.containerHeight = this.sceneH * 0.3; // always 30% of screen
    this.initialTopPadding = topPadding;
    this.totalTopPadding = topPadding; // starting top padding
    this.bottomPadding = bottomPadding;
    this.isShowing = false;
    this.navbarHeight = this.sceneH * 0.12;
  }

  saveTotalPadding(value: number) {
    // We save all the top padding + the height of the elements so that we can avoid overlapping
    this.totalTopPadding += value + 10; // 10 is the extra padding
  }

  #setupBackground(): Phaser.GameObjects.NineSlice {
    return this.scene.add
      .nineslice(
        0,
        0,
        TEXTURE_NAMES.WOODEN_BG,
        0,
        this.sceneW / 3, // we divide by 3 since we scale it to 3
        this.containerHeight / 3, // we divide by 3 since we scale it to 3
        14,
        14,
        14,
        14,
      )
      .setOrigin(0.5, 0)
      .setScale(3);
  }

  /**
   * This is where all the contents are added.
   * */
  setContent():
    | (
        | Phaser.GameObjects.Text
        | Phaser.GameObjects.Container
        | Phaser.GameObjects.Image
      )[]
    | void {}

  /**
   * This depends on the contents
   * */
  reAdjustSpacing(): void {}

  reAdjustHeight(
    arrayOfObjs: (
      | Phaser.GameObjects.Text
      | Phaser.GameObjects.Container
      | Phaser.GameObjects.Image
      | Phaser.GameObjects.NineSlice
    )[],
  ) {
    let totalHeight = 0;
    for (const obj of arrayOfObjs) {
      totalHeight += obj.getBounds().height;
    }

    // we factor the 10 padding we always add inbetween

    this.setContainerHeight(
      totalHeight +
        (arrayOfObjs.length - 1) * 10 +
        (this.bottomPadding + this.initialTopPadding),
    );
  }

  sampleBorderForDebug(): Phaser.GameObjects.Rectangle {
    // Create a rectangle with just a stroke (no fill)
    const border = this.scene.add.rectangle(0, 0, 100, 100);
    border.setStrokeStyle(4, 0xff0000);

    return border;
  }

  init(autoShow: boolean) {
    this.isShowing = autoShow;

    this.container = this.scene.add
      .container(
        this.sceneW / 2,
        this.sceneH + this.containerHeight + this.navbarHeight,
      )
      .setDepth(99);

    this.mainBackgroundSprite = this.#setupBackground();

    this.container.add(this.mainBackgroundSprite);

    const contents = this.setContent();

    if (contents) {
      this.container?.add(contents);
    }

    this.mainBackgroundSprite.height = this.containerHeight / 3;

    if (autoShow) {
      this.scene.tweens.add({
        targets: this.container,
        ease: "Sine",
        delay: 50,
        repeat: 0,
        repeatDelay: 2000,
        duration: 500,
        alpha: 1,
        y: this.sceneH - this.containerHeight - this.navbarHeight,
        onComplete: () => (this.isShowing = true),
      });
    }
  }

  getContainerHeight(): number {
    return this.containerHeight;
  }

  setContainerHeight(height: number) {
    this.containerHeight = height;
  }

  setTotalTopPadding(initialPaddingTop: number) {
    this.totalTopPadding = initialPaddingTop;
  }

  hideDrawer() {
    this.scene.tweens.add({
      targets: this.container,
      ease: "Sine",
      repeat: 0,
      repeatDelay: 2000,
      duration: 500,
      y: this.sceneH + this.containerHeight + this.navbarHeight,
      onComplete: () => (this.isShowing = false),
    });
  }

  showDrawer() {
    this.scene.tweens.add({
      targets: this.container,
      ease: "Sine",
      repeat: 0,
      repeatDelay: 2000,
      duration: 500,
      y: this.sceneH - this.containerHeight - this.navbarHeight,
      onComplete: () => (this.isShowing = true),
    });
  }

  #onClickHandler() {
    if (this.isShowing) {
      this.hideDrawer();
    } else {
      this.showDrawer();
    }
  }

  #onClickDetails() {
    console.log("clicked details!");
  }
}
