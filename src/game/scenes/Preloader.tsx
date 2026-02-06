import { Scene } from "phaser";

import INGameLogo from "../../../assets/ingame-logo.png";

import heroBG from "../../../assets/hero_bg.jpg";
import leftArrow from "../../../assets/left_arrow.png";

import cattoSprite from "../../../assets/sprites/catto/catto_texture_v2.png";
import cattoSpriteJson from "../../../assets/sprites/catto/catto_texture_v2.json";
import splashScreenBG from "../../../assets/splash_screen.png";

import ghSprite from "../../../assets/sprites/golden_knight/golden_knight_texture_v2.png";
import ghSpriteJson from "../../../assets/sprites/golden_knight/golden_knight_texture_v2.json";

import skeletonSprite from "../../../assets/sprites/skeleton/skeleton_texture_v4.png";
import skeletonSpriteJson from "../../../assets/sprites/skeleton/skeleton_texture_v4.json";

import rathalosSprite from "../../../assets/sprites/rathalos_hunter/rathalos_texture_v3.png";
import rathalosSpriteJson from "../../../assets/sprites/rathalos_hunter/rathalos_texture_v3.json";

import mobsSprite from "../../../assets/sprites/mobs/mobs_v2.png";
import mobsSpriteJson from "../../../assets/sprites/mobs/mobs_v2.json";

import blueBorderBrownBg from "../../../assets/ui/tile_0005.png";
import blueBorderBlueBg from "../../../assets/ui/tile_0029.png";
import brownBorderWhiteBg from "../../../assets/ui/tile_0000.png";
import blueBorderWhiteBg from "../../../assets/ui/tile_0007.png";
import blueBorderBlueBgNoDesign from "../../../assets/ui/tile_0015.png";

import TEXTURE_NAMES from "../../constants/texture_names.ts";
import {
  SKELETON_HURT_CONFIGS,
  SKELETON_SHOOT_CONFIGS,
  SKELETON_WALK_CONFIGS,
} from "../../constants/anim_configs/skeleton_anim_configs.ts";
import {
  GOLDEN_KNIGHT_IDLE_CONFIGS,
  GOLDEN_KNIGHT_SLASH_CONFIGS,
  GOLDEN_KNIGHT_WALK_CONFIGS,
} from "../../constants/anim_configs/golden_knight_anim_configs.ts";
import type { ANIM_CONFIG } from "../../types/anim.types.ts";
import SCENE_NAMES from "../../constants/scene_names.ts";
import RATHALOS_ANIM_CONFIGS from "../../constants/anim_configs/rathalos_anim_configs.ts";
import CATTO_ANIM_CONFIGS from "../../constants/anim_configs/catto_anim_configs.ts";
import MOBS_ANIM_CONFIGS from "../../constants/anim_configs/mobs_anim_configs.ts";

export class Preloader extends Scene {
  constructor() {
    super(SCENE_NAMES.PRELOADER);
  }

  generateAnimations(configs: ANIM_CONFIG[]) {
    for (const config of configs) {
      const { key, framesConfig, frameRate, repeat } = config;
      const { sprite, prefix, suffix, start, end } = framesConfig;

      this.anims.create({
        key,
        frames: this.anims.generateFrameNames(sprite, {
          prefix,
          suffix,
          start,
          end,
        }),
        frameRate,
        repeat,
      });
    }
  }

  initGoldenKnightAnimations() {
    this.generateAnimations([
      ...GOLDEN_KNIGHT_WALK_CONFIGS,
      ...GOLDEN_KNIGHT_SLASH_CONFIGS,
      ...GOLDEN_KNIGHT_IDLE_CONFIGS,
    ]);
  }

  initSkeletonAnimations() {
    this.generateAnimations([
      ...SKELETON_WALK_CONFIGS,
      ...SKELETON_SHOOT_CONFIGS,
      ...SKELETON_HURT_CONFIGS,
    ]);
  }

  initMobsAnimations() {
    this.generateAnimations(MOBS_ANIM_CONFIGS);
  }

  initRathalosAnimations() {
    this.generateAnimations(RATHALOS_ANIM_CONFIGS);
  }

  initCattoAnimations() {
    this.generateAnimations(CATTO_ANIM_CONFIGS);
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    // this.add.image(0, 0, "background");
  }

  preload() {
    // //  Load the assets for the game - Replace with your own assets
    // this.load.setPath("assets");
    // this.load.image("logo", "logo.png");
    // this.load.image("star", "star.png");
    //
    //

    this.load.image(TEXTURE_NAMES.LOGO, INGameLogo);
    this.load.image(TEXTURE_NAMES.HERO_BG, heroBG);
    this.load.image(TEXTURE_NAMES.SPLASH_SCREEN_BG, splashScreenBG);

    this.load.image(TEXTURE_NAMES.LEFT_ARROW, leftArrow);
    // this.load.image(TEXTURE_NAMES.RIGHT_ARROW, rightArrow);

    this.load.image(TEXTURE_NAMES.BLUE_BORDER_BROWN_BG, blueBorderBrownBg);
    this.load.image(TEXTURE_NAMES.BROWN_BORDER_WHITE_BG, brownBorderWhiteBg);
    this.load.image(TEXTURE_NAMES.BLUE_BORDER_BLUE_BG, blueBorderBlueBg);
    this.load.image(TEXTURE_NAMES.BLUE_BORDER_WHITE_BG, blueBorderWhiteBg);
    this.load.image(
      TEXTURE_NAMES.BLUE_BORDER_BLUE_BG_NO_DESIGN,
      blueBorderBlueBgNoDesign,
    );

    this.load.atlas(TEXTURE_NAMES.GOLDEN_KNIGHT, ghSprite, ghSpriteJson);

    this.load.atlas(TEXTURE_NAMES.SKELETON, skeletonSprite, skeletonSpriteJson);

    this.load.atlas(TEXTURE_NAMES.MOBS, mobsSprite, mobsSpriteJson);

    this.load.atlas(
      TEXTURE_NAMES.RATHALOS_HUNTER,
      rathalosSprite,
      rathalosSpriteJson,
    );

    this.load.atlas(TEXTURE_NAMES.CATTO, cattoSprite, cattoSpriteJson);
  }

  async create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    this.initGoldenKnightAnimations();
    this.initRathalosAnimations();
    this.initCattoAnimations();
    this.initSkeletonAnimations();
    this.initMobsAnimations();

    try {
      //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
      // this.scene
      //   .launch(SCENE_NAMES.NAVBAR, { quests: response })
      //   .launch(SCENE_NAMES.CHARACTER_DETAILS, { quests: response });

      this.scene.start(SCENE_NAMES.SPLASH_SCREEN);
    } catch (error) {
      console.log("Error Getting Tasks", error);
    }
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
  }
}
