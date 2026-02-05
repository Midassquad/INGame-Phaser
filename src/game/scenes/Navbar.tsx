import { Scene } from "phaser";
import TEXTURE_NAMES from "../../constants/texture_names";
import { EventBus } from "../EventBus";
import SCENE_NAMES from "../../constants/scene_names";

export class Navbar extends Scene {
  #gameW: number | undefined;
  #gameH: number | undefined;

  constructor() {
    super(SCENE_NAMES.NAVBAR);
  }

  sampleBorderForDebug(): Phaser.GameObjects.Rectangle {
    // Create a rectangle with just a stroke (no fill)
    const border = this.add.rectangle(0, 0, 100, 100);
    border.setStrokeStyle(4, 0xff0000);

    return border;
  }

  generateEachNavs(navName: string[]) {
    const columnWidth = this.#gameW! / navName.length;

    const outerNavContainer = this.add.container(
      columnWidth / 2,
      (columnWidth - 30) / 2,
    );

    for (let index = 0; index < navName.length; index++) {
      const navCont = this.add.container(0, 0);
      // const navCont = this.add.container(columnWidth / 2, columnWidth / 2);
      const nav = navName[index];

      const bgNav = this.add
        .nineslice(
          0,
          0,
          TEXTURE_NAMES.BLUE_BORDER_BLUE_BG,
          0,
          (columnWidth - 20) / 2,
          (columnWidth - 80) / 2,
          14,
          14,
          14,
          14,
        )

        .setScale(2)
        .setInteractive({ cursor: "pointer" });

      const navText = this.add
        .text(0, 0, nav)
        .setStyle({
          fontSize: 30,
          fontFamily: "PixelifySans",
          fill: "white",
          align: "center",
        })
        .setStroke("black", 3);

      bgNav.on("pointerdown", () => {
        this.handleNavClick(nav);
      });

      Phaser.Display.Align.In.Center(navText, bgNav);

      navCont.add(bgNav);
      navCont.add(navText);

      outerNavContainer.add(navCont);
    }

    Phaser.Actions.GridAlign(outerNavContainer.list, {
      width: navName.length,
      height: 1,
      cellWidth: columnWidth - 10,
      cellHeight: columnWidth,
      x: 15,
      y: 0,
    });
    return outerNavContainer;
  }

  handleNavClick(nav: string) {
    console.log("Navigate to:", nav);
    if (nav == "Hero") {
      EventBus.emit("change-scene", SCENE_NAMES.CHARACTER_DETAILS);
    }
    if (nav === "Battle") {
      EventBus.emit("change-scene", SCENE_NAMES.BATTLE);
    }
    if (nav === "Settings") {
      EventBus.emit("change-scene", SCENE_NAMES.SETTINGS);
    }
  }

  create() {
    this.#gameW = this.scale.width;
    this.#gameH = this.scale.height;

    const navItems = this.generateEachNavs([
      "Hero",
      "Battle",
      "Map",
      "Settings",
    ]);

    const navContainer = this.add.container(
      0,
      this.#gameH - this.#gameH * 0.12,
    );

    const bg = this.add
      .nineslice(
        0,
        0,
        TEXTURE_NAMES.BLUE_BORDER_WHITE_BG,
        0,
        this.#gameW / 2,
        (this.#gameH * 0.12) / 2,
        14,
        14,
        14,
        14,
      )
      .setOrigin(0, 0)
      .setScale(2);

    navContainer.add(bg);

    navContainer.add(navItems);

    // const gameLogo = this.add
    //   .image(this.#gameW / 2, (this.#gameH * 0.32) / 2, TEXTURE_NAMES.LOGO)
    //   .setScale(0.5);
    //
    // navContainer.add(gameLogo);

    EventBus.emit("current-scene-ready", this);
  }
}
