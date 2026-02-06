import { GameObjects, Scene } from "phaser";
import SCENE_NAMES from "../../constants/scene_names.ts";
import TEXTURE_NAMES from "../../constants/texture_names.ts";
import type { GameData } from "../../types/global.types.ts";
import { getTasks } from "../../services/inGameServices.ts";
import { EventBus } from "../EventBus.tsx";

export class LoginScreen extends Scene {
  background: GameObjects.Image | undefined;
  inputText: string;
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
    const hiddenInput = document.createElement("input");
    hiddenInput.style = "visibility: hidden";
    this.add.dom(this.scale.width / 2, this.scale.width / 2, hiddenInput);
    console.log("focus");
    hiddenInput.focus();

    this.inputText = "";
    // Add background image
    this.background = this.add.image(0, 0, TEXTURE_NAMES.HERO_BG);
    this.background.setPosition(0, 0);
    this.background.setOrigin(0, 0);

    // Add logo in the center
    const logo = this.add.image(this.scale.width / 2, 300, TEXTURE_NAMES.LOGO);

    // Scale logo if needed (adjust this value to make logo bigger/smaller)
    logo.setScale(1);

    // Input box background
    // this.inputBox = this.add.rectangle(360, 460, 500, 60, 0x2c3e50);

    this.inputBox = this.add.container(0, 20);
    this.add.nineslice(
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
    );
    // this.inputBox.setStrokeStyle(2, 0xa3703a);

    // Placeholder text
    this.placeholderText = this.add
      .text(360, 460, "Enter your username...", {
        fontSize: "20px",
        color: "#a3703a",
        fontFamily: "PixelifySans",
      })
      .setOrigin(0.5);

    // Input text display
    this.displayText = this.add
      .text(160, 460, "", {
        fontSize: "24px",
        color: "#a3703a",
        fontFamily: "PixelifySans",
      })
      .setOrigin(0, 0.5);

    // Cursor
    this.cursor = this.add.rectangle(160, 460, 2, 30, 0xa3703a);
    this.cursor.setOrigin(0, 0.5);

    // Blinking cursor animation
    this.time.addEvent({
      delay: 500,
      callback: () => {
        this.cursorVisible = !this.cursorVisible;
        this.cursor.setVisible(this.cursorVisible);
      },
      loop: true,
    });

    // Enable keyboard input
    this.input.keyboard.on("keydown", this.handleKeyPress, this);

    // Make the input box interactive
    this.inputBox.setInteractive();
    this.inputBox.on("pointerdown", () => {
      this.inputBox.setStrokeStyle(3, 0xa3703a);
    });

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
      console.log("blur");
      hiddenInput.blur();
      this.onLogin();
    });

    EventBus.emit("current-scene-ready", this);
  }

  handleKeyPress(event) {
    // Handle backspace
    if (event.key === "Backspace") {
      this.inputText = this.inputText.slice(0, -1);
      this.updateDisplay();
      return;
    }

    // Handle escape (clear all)
    if (event.key === "Escape") {
      this.inputText = "";
      this.updateDisplay();
      return;
    }

    // Handle regular character input
    if (event.key.length === 1 && this.inputText.length < this.maxLength) {
      this.inputText += event.key;
      this.updateDisplay();
    }
  }

  updateDisplay() {
    // Update the text display
    this.displayText?.setText(this.inputText);

    // Hide placeholder if there's text
    this.placeholderText?.setVisible(this.inputText.length === 0);

    // Update cursor position
    const textWidth = this.displayText.width;
    this.cursor.x = 160 + textWidth + 2;

    // Reset cursor visibility
    this.cursorVisible = true;
    this.cursor.setVisible(true);
  }

  async onLogin() {
    try {
      const response = await getTasks(this.inputText);

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
