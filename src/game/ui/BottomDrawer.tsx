import type { Scene } from "phaser";
import TEXTURE_NAMES from "../../constants/texture_names";

export class BottomDrawer {
  #scene: Scene;
  #container?: Phaser.GameObjects.Container;

  #sceneW: number;
  #sceneH: number;

  #containerHeight: number;

  #totalTopPadding: number; // compute the total top padding so that the contents below go down

  #isShowing: boolean;
  #customTexts: Phaser.GameObjects.Text[] | [];

  constructor(scene: Scene) {
    this.#scene = scene;
    this.#sceneW = scene.scale.width;
    this.#sceneH = scene.scale.height;
    this.#containerHeight = this.#sceneH * 0.3; // always 30% of screen
    this.#totalTopPadding = 30;
    this.#isShowing = false;
    this.#customTexts = [];
  }

  #saveTotalPadding(value: number) {
    // We save all the top padding + the height of the elements so that we can avoid overlapping
    this.#totalTopPadding += 10 + value; // 10 is the extra padding
  }

  #setupBackground(): Phaser.GameObjects.NineSlice {
    return this.#scene.add
      .nineslice(
        0,
        0,
        TEXTURE_NAMES.BLUE_BORDER_BROWN_BG,
        0,
        this.#sceneW / 3, // we divide by 3 since we scale it to 3
        this.#containerHeight / 3, // we divide by 3 since we scale it to 3
        14,
        14,
        14,
        14,
      )
      .setOrigin(0.5, 0)
      .setScale(3);
  }

  #setContent() {
    // HEADER
    const header = this.#scene.add
      .text(0, this.#totalTopPadding, "CURRENT TASK:")
      .setStyle({
        fontSize: 35,
        fontFamily: "PixelifySans",
        fill: "#ffff61",
        align: "center",
        wordWrap: {
          width: this.#sceneW - this.#sceneW * 0.1,
        },
      })
      .setStroke("black", 3)
      .setOrigin(0.5, 0);

    this.#saveTotalPadding(header.height);

    // TITLE - This will be dynamic
    const title = this.#scene.add
      .text(0, this.#totalTopPadding, "Start Hackathon Development")
      .setStyle({
        fontSize: 30,
        fontFamily: "PixelifySans",
        fill: "white",
        align: "left",
        wordWrap: {
          width: this.#sceneW - this.#sceneW * 0.1,
        },
      })
      .setStroke("black", 3)
      .setOrigin(0.5, 0);

    this.#saveTotalPadding(title.height);

    // DESCRIPTION - This will be dynamic
    const descriptionContainer = this.#scene.add.container(
      0,
      this.#totalTopPadding,
    );

    const descriptionBg = this.#scene.add
      .nineslice(
        0,
        0,
        TEXTURE_NAMES.BROWN_BORDER_WHITE_BG,
        0,
        this.#sceneW / 3 - 50 / 3, // we divide by 3 since we scale it, then we subtract 15 for padding, we also divide by 3 the 15 since we scaling
        (this.#containerHeight / 3) * 0.5, // we divide by 3, then get the 40% of it
        10,
        10,
        10,
        10,
      )
      .setOrigin(0.5, 0) // put the origin point on the middle of X and at the top of Y
      .setScale(3);

    const descriptionCopy = this.#scene.add
      .text(
        0,
        25,
        "Create a Webhook for Trello to check on updates on Tasks, Stasus, Assignments etc.\n\nAlso, here's a new line just to test.",
      )
      .setStyle({
        fontSize: 24,
        fontFamily: "PixelifySans",
        fill: "#a3703a",
        align: "left",
        wordWrap: {
          width: this.#sceneW - 80,
        },
      })
      .setOrigin(0.5, 0);

    descriptionBg.setSize(
      this.#sceneW / 3 - 50 / 3,
      (descriptionCopy.height + 50) / 3,
    ); // adjust the size of the description background based on the height of description copy

    this.#saveTotalPadding(descriptionBg.height * 3);

    descriptionContainer.add(descriptionBg);
    descriptionContainer.add(descriptionCopy);

    // Button
    const buttonContainer = this.#scene.add.container(0, this.#totalTopPadding);

    const buttonBg = this.#scene.add
      .nineslice(
        0,
        0,
        TEXTURE_NAMES.BLUE_BORDER_BLUE_BG,
        0,
        30,
        10,
        10,
        10,
        10,
        10,
      )
      .setOrigin(0.5, 0) // put the origin point on the middle of X and at the top of Y
      .setScale(3);

    const button = this.#scene.add
      .text(0, 18, "DETAILS")
      .setStyle({
        fontSize: 30,
        fontFamily: "PixelifySans",
        fill: "white",
        align: "center",
        wordWrap: {
          width: this.#sceneW - this.#sceneW * 0.1,
        },
      })
      .setStroke("black", 3)
      .setOrigin(0.5, 0);

    buttonBg.setSize((button.width + 70) / 3, (button.height + 40) / 3);

    this.#saveTotalPadding(buttonBg.height * 3);

    buttonContainer.add(buttonBg);
    buttonContainer.add(button);

    buttonBg.setInteractive({ cursor: "pointer" });

    buttonBg.on("pointerdown", () => {
      this.#onClickDetails();
    });

    this.#container?.add(header);
    this.#container?.add(title);
    this.#container?.add(descriptionContainer);
    this.#container?.add(buttonContainer);
  }

  sampleBorderForDebug(): Phaser.GameObjects.Rectangle {
    // Create a rectangle with just a stroke (no fill)
    const border = this.#scene.add.rectangle(0, 0, 100, 100);
    border.setStrokeStyle(4, 0xff0000);

    return border;
  }

  init() {
    this.#container = this.#scene.add.container(
      this.#sceneW / 2,
      this.#sceneH + this.#containerHeight,
    );

    const background = this.#setupBackground();

    this.#container.add(background);

    this.#setContent();

    for (const text of this.#customTexts ?? []) {
      this.#container.add(text);
    }

    this.#scene.tweens.add({
      targets: this.#container,
      ease: "Sine",
      delay: 50,
      repeat: 0,
      repeatDelay: 2000,
      duration: 500,
      alpha: 1,
      y: this.#sceneH - this.#containerHeight,
      onComplete: () => (this.#isShowing = true),
    });

    // this.#scene.input.on("pointerdown", () =>
    //   this.#onClickHandler(this.#container),
    // );
  }

  setCustomText(text: Phaser.GameObjects.Text) {
    this.#customTexts = [...this.#customTexts, text];
  }

  getContainerHeight(): number {
    return this.#containerHeight;
  }

  setContainerHeight(height: number) {
    this.#containerHeight = height;
  }

  #onClickHandler(container: Phaser.GameObjects.Container | undefined) {
    if (this.#isShowing) {
      this.#scene.tweens.add({
        targets: container,
        ease: "Sine",
        repeat: 0,
        repeatDelay: 2000,
        duration: 500,
        y: this.#sceneH + this.#containerHeight,
        // yoyo: true,
        // alpha: 0,
        //
        // onStart: () => {
        //   console.log("START TWEEN");
        // },
        // onYoyo: () => {
        //   console.log("ON YOYO");
        // },
        onComplete: () => (this.#isShowing = false),
      });
    } else {
      this.#scene.tweens.add({
        targets: container,
        ease: "Sine",
        repeat: 0,
        repeatDelay: 2000,
        duration: 500,
        y: this.#sceneH - this.#containerHeight,
        onComplete: () => (this.#isShowing = true),
      });
    }
  }

  #onClickDetails() {
    console.log("clicked details!");
  }
}
