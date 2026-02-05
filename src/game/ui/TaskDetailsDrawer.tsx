import type { Scene } from "phaser";
import { BottomDrawer } from "./BottomDrawer";
import TEXTURE_NAMES from "../../constants/texture_names";

interface TaskDetailsContents {
  title: string;
  description: string;
}

export class TaskDetailsDrawer extends BottomDrawer {
  header!: Phaser.GameObjects.Text;
  title!: Phaser.GameObjects.Text;

  descriptionContainer!: Phaser.GameObjects.Container;
  descriptionBg!: Phaser.GameObjects.NineSlice;
  descriptionCopy!: Phaser.GameObjects.Text;

  buttonContainer!: Phaser.GameObjects.Container;
  buttonBg!: Phaser.GameObjects.NineSlice;
  button!: Phaser.GameObjects.Text;

  contents: TaskDetailsContents;

  paddingTopDescription: number; // this is the padding inside the description box
  paddingBottomDescription: number;

  constructor(
    scene: Scene,
    topPadding: number,
    bottomPadding: number,
    contents: TaskDetailsContents,
  ) {
    super(scene, topPadding, bottomPadding);

    this.contents = contents;

    this.paddingTopDescription = 20;
    this.paddingBottomDescription = 20;
  }

  // Override
  setContent(): (
    | Phaser.GameObjects.Text
    | Phaser.GameObjects.Container
    | Phaser.GameObjects.Image
  )[] {
    // HEADER
    this.header = this.scene.add
      .text(0, this.totalTopPadding, "CURRENT TASK:")
      .setStyle({
        fontSize: 35,
        fontFamily: "PixelifySans",
        fill: "#ffff61",
        align: "center",
        wordWrap: {
          width: this.sceneW - this.sceneW * 0.1,
        },
      })
      .setStroke("black", 3)
      .setOrigin(0.5, 0);

    this.saveTotalPadding(this.header.height);

    // TITLE - This will be dynamic
    this.title = this.scene.add
      .text(0, this.totalTopPadding, this.contents.title)
      .setStyle({
        fontSize: 30,
        fontFamily: "PixelifySans",
        fill: "white",
        align: "center",
        wordWrap: {
          width: this.sceneW - this.sceneW * 0.1,
        },
      })
      .setStroke("black", 3)
      .setOrigin(0.5, 0);

    this.saveTotalPadding(this.title.height);

    // DESCRIPTION - This will be dynamic

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
        (this.containerHeight / 3) * 0.5, // we divide by 3, then get the 40% of it
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
        this.contents.description,
      )
      .setStyle({
        fontSize: 24,
        fontFamily: "PixelifySans",
        fill: "#a3703a",
        align: "left",
        wordWrap: {
          width: this.sceneW - 100,
        },
      })
      .setOrigin(0, 0);

    this.setDescriptionBGSize();

    this.saveTotalPadding(this.descriptionBg.height * 3);

    this.descriptionContainer.add(this.descriptionBg);
    this.descriptionContainer.add(this.descriptionCopy);

    // // Button
    //
    // this.buttonContainer = this.scene.add.container(0, this.totalTopPadding);
    // this.buttonBg = this.scene.add
    //   .nineslice(
    //     0,
    //     0,
    //     TEXTURE_NAMES.BLUE_BORDER_BLUE_BG,
    //     0,
    //     30,
    //     10,
    //     10,
    //     10,
    //     10,
    //     10,
    //   )
    //   .setOrigin(0.5, 0) // put the origin point on the middle of X and at the top of Y
    //   .setScale(3);
    //
    // this.button = this.scene.add
    //   .text(0, 18, "DETAILS")
    //   .setStyle({
    //     fontSize: 30,
    //     fontFamily: "PixelifySans",
    //     fill: "white",
    //     align: "center",
    //     wordWrap: {
    //       width: this.sceneW - this.sceneW * 0.1,
    //     },
    //   })
    //   .setStroke("black", 3)
    //   .setOrigin(0.5, 0);
    // this.buttonContainer.add(this.buttonBg);
    // this.buttonContainer.add(this.button);
    //
    // this.buttonBg.setSize(
    //   (this.button.width + 70) / 3,
    //   (this.button.height + 40) / 3,
    // );
    //
    // this.saveTotalPadding(this.buttonBg.height * 3);

    this.reAdjustHeight([
      this.header,
      this.title,
      this.descriptionContainer,
      // this.buttonContainer,
    ]); // only add the objects that you want to be measured

    return [
      this.header,
      this.title,
      this.descriptionContainer,
      // this.buttonContainer,
    ];
  }

  setDescriptionBGSize() {
    this.descriptionBg.setSize(
      this.sceneW / 3 - 50 / 3,
      (this.descriptionCopy.height +
        (this.paddingTopDescription + this.paddingBottomDescription)) /
        3,
    ); // adjust the size of the description background based on the height of description copy
  }

  reAdjustSpacing(): void {
    let totalP: number = this.initialTopPadding;
    this.title.setText(this.contents.title);
    this.descriptionCopy.setText(this.contents.description);

    this.setDescriptionBGSize();

    this.header.setY(this.initialTopPadding);

    totalP += 10 + this.header.height;

    this.title.setY(totalP);

    totalP += 10 + this.title.height;

    this.descriptionContainer.setY(totalP);

    totalP += this.descriptionBg.height * 3 + 10;

    // this.buttonContainer.setY(totalP);
    //
    // totalP += this.buttonBg.height * 3;

    this.reAdjustHeight([
      this.header,
      this.title,
      this.descriptionContainer,
      // this.buttonBg,
    ]); // only add the objects that you want to be measured check this

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

  setTitle(title: string): TaskDetailsDrawer {
    this.contents.title = title;
    return this;
  }

  setDescription(desc: string): TaskDetailsDrawer {
    this.contents.description = desc;
    return this;
  }

  setPaddingTopDescription(padding: number): TaskDetailsDrawer {
    this.paddingTopDescription = padding;
    return this;
  }

  setPaddingBottomDescription(padding: number): TaskDetailsDrawer {
    this.paddingBottomDescription = padding;
    return this;
  }
}
