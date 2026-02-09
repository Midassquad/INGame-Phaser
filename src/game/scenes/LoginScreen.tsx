import { GameObjects, Scene } from "phaser";
import SCENE_NAMES from "../../constants/scene_names.ts";
import TEXTURE_NAMES from "../../constants/texture_names.ts";
import type { GameData, Quest } from "../../types/global.types.ts";
import { getTasks } from "../../services/inGameServices.ts";
import { EventBus } from "../EventBus.tsx";

export class LoginScreen extends Scene {
  background: GameObjects.Image | undefined;
  inputText: string;
  inputElem!: HTMLInputElement;
  cursorVisible: boolean;
  cursor: GameObjects.Rectangle | undefined;
  maxLength: number;
  inputBox: GameObjects.Rectangle | GameObjects.Container | undefined;
  placeholderText: GameObjects.Text | undefined;
  displayText: GameObjects.Text | undefined;
  cursortest: GameObjects.Rectangle | undefined;

  gameData: GameData | undefined;

  constructor() {
    super(SCENE_NAMES.LOGIN_SCREEN);
    this.inputText = "";
    this.cursorVisible = true;
    this.maxLength = 30;
  }

  init(gameData: GameData) {
    this.gameData = gameData;
  }

  create() {
    this.inputText = "";
    // Add background image
    this.background = this.add.image(0, 0, TEXTURE_NAMES.FOREST);
    this.background.setPosition(0, 0);
    this.background.setOrigin(0, 0);

    this.inputElem = document.createElement("input");
    this.inputElem.className = "username-input";
    this.inputElem.placeholder = "Enter your username...";
    this.add.dom(356, 460, this.inputElem);

    // Add logo in the center
    const logo = this.add.image(this.scale.width / 2, 300, TEXTURE_NAMES.LOGO);

    // Scale logo if needed (adjust this value to make logo bigger/smaller)
    logo.setScale(1);

    // Input box background
    // this.inputBox = this.add.rectangle(360, 460, 500, 60, 0x2c3e50);

    this.add
      .nineslice(
        360,
        460,
        TEXTURE_NAMES.BROWN_BORDER_WHITE_BG,
        0,
        460,
        60,
        10,
        10,
        10,
        10,
      )
      .setInteractive({ cursor: "text" });

    // // Make the input box interactive
    // this.inputBox.setInteractive();
    // this.inputBox.on("pointerdown", () => {
    //   this.inputBox.setStrokeStyle(3, 0xa3703a);
    // });

    // Button
    const buttonContainer = this.add.container(0, 20);

    const buttonBg = this.add.nineslice(
      360,
      540,
      TEXTURE_NAMES.BLUE_BORDER_BLUE_BG,
      0,
      120,
      60,
      10,
      10,
      10,
      10,
    );

    const btn = this.add
      .text(360, 520, "Login")
      .setStyle({
        fontSize: 30,
        fontFamily: "PixelifySans",
        fill: "white",
        align: "center",
      })
      .setStroke("black", 3)
      .setOrigin(0.5, 0);

    buttonContainer.add(buttonBg);
    buttonContainer.add(btn);

    buttonBg.setInteractive({ cursor: "pointer" });

    buttonBg.on("pointerdown", () => {
      this.inputElem.blur();
      this.onLogin();
    });

    EventBus.emit("current-scene-ready", this);
  }

  async onLogin() {
    try {
      this.inputText = this.inputElem.value;
      const response = await getTasks(this.inputText);
      // const response: Quest[] = [
      //   {
      //     name: "Hello",
      //     description: "Description",
      //     modelName: "ogre",
      //     trelloCardId: "123",
      //   },
      //
      //   {
      //     name: "Hello",
      //     description: "Description",
      //     modelName: "goblin",
      //     trelloCardId: "1235",
      //   },
      //
      //   {
      //     name: "Hello",
      //     description: "Description",
      //     modelName: "bug",
      //     trelloCardId: "126",
      //   },
      // ];
      // console.log("response", response);

      this.scene
        .launch(SCENE_NAMES.NAVBAR, {
          username: this.inputText,
          quests: response,
        })
        .launch(SCENE_NAMES.CHARACTER_DETAILS, {
          username: this.inputText,
          quests: response,
        })
        .stop(SCENE_NAMES.LOGIN_SCREEN);
    } catch (error) {
      console.log("Error Getting Tasks", error);
    }
  }
}
