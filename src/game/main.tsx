import Phaser from "phaser";
import { Battle } from "./scenes/Battle";
import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { CharacterDetails } from "./scenes/CharacterDetails";
import { Navbar } from "./scenes/Navbar";
import { Settings } from "./scenes/Settings";
import { SplashScreen } from "./scenes/SplashScreen";
import { LoginScreen } from "./scenes/LoginScreen";

const config = {
  type: Phaser.AUTO,
  scene: [
    Boot,
    Preloader,
    SplashScreen,
    LoginScreen,
    Battle,
    CharacterDetails,
    Settings,
    Navbar,
  ],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  dom: {
    createContainer: true, // This is crucial for DOM elements to display
  },
  scale: {
    mode: Phaser.Scale.FIT,
    width: 720,
    height: 1280,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: window.innerWidth,
    // height: window.innerHeight,
    // max: {
    //   width: 680,
    //   height: window.innerHeight,
    // },
  },
  parent: "game-container",
};

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
