import { Scene } from "phaser";
import terrainBg from "../../../assets/golden_crystal_forest.png";
import SCENE_NAMES from "../../constants/scene_names";

export class Boot extends Scene {
  constructor() {
    super(SCENE_NAMES.BOOT);
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

    this.load.image("background", terrainBg);
  }

  create() {
    this.scene.start(SCENE_NAMES.PRELOADER);
  }
}
