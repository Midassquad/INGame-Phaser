import { EventBus } from "../EventBus";
import { Animations, GameObjects, Scene } from "phaser";
import { CATTO_KEYS, RATHALOS_HUNTER_KEYS } from "../../constants/anim_keys.ts";
import Golden_Knight from "../../characters/Golden_Knight.tsx";
import TEXTURE_NAMES from "../../constants/texture_names.ts";
import SCENE_NAMES from "../../constants/scene_names.ts";
import { AIDialogBoxDrawer } from "../ui/AIDialogBoxDrawer.tsx";
import { TaskDetailsDrawer } from "../ui/TaskDetailsDrawer.tsx";
import Unit from "../../characters/Unit.tsx";
import Skeleton from "../../characters/Skeleton.tsx";
import Pet from "../../characters/Pet.tsx";
import Bug from "../../characters/Bug.tsx";
import Ogre from "../../characters/Ogre.tsx";
import Goblin from "../../characters/Goblin.tsx";
import type { Coordinates, GameData, Quest } from "../../types/global.types.ts";

export class Battle extends Scene {
  gameW: number;
  gameH: number;

  background: GameObjects.Image | undefined;

  hero: Golden_Knight | undefined;
  heroSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;

  isHeroNearAnEnemy: boolean;

  quests: Quest[];
  mobsContainer: Phaser.GameObjects.Container | undefined;

  selectedSprite: Unit | undefined;
  lastSelectedMobSprite: Unit | undefined;

  taskDetailsDrawer: TaskDetailsDrawer | undefined;
  aiDialogBox: AIDialogBoxDrawer | undefined;

  leftKey: Phaser.Input.Keyboard.Key | undefined;
  rightKey: Phaser.Input.Keyboard.Key | undefined;
  upKey: Phaser.Input.Keyboard.Key | undefined;
  downKey: Phaser.Input.Keyboard.Key | undefined;

  fKey: Phaser.Input.Keyboard.Key | undefined;

  pet: Pet | undefined;
  hasNewMessage: boolean;

  constructor() {
    super(SCENE_NAMES.BATTLE);

    this.isHeroNearAnEnemy = false;
    this.hasNewMessage = false;
    this.quests = [
      {
        name: "",
        description: "",
        modelName: "",
      },
    ];

    this.gameW = 0;
    this.gameH = 0;
  }

  setupControllerListener() {
    EventBus.on("controls-pressed", (type: string) => {
      if (type === "attack") {
        this.hero?.attack();
      } else {
        this.hero?.walk(type);
      }
    });

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventBus.removeListener("controls-pressed");
    });
  }

  setupListeners() {
    EventBus.on("quests-received", (gameData: GameData) => {
      this.onReceivedQuests(gameData);
    });

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventBus.removeListener("quests-received");
    });
  }

  setupKeyboardEvents() {
    this.leftKey = this.input.keyboard?.addKey("LEFT");
    this.rightKey = this.input.keyboard?.addKey("RIGHT");
    this.upKey = this.input.keyboard?.addKey("UP");
    this.downKey = this.input.keyboard?.addKey("DOWN");

    this.fKey = this.input.keyboard?.addKey("F");

    this.leftKey?.on("down", () => this.hero?.walk("left"));
    this.rightKey?.on("down", () => this.hero?.walk("right"));
    this.upKey?.on("down", () => this.hero?.walk("up"));
    this.downKey?.on("down", () => this.hero?.walk("down"));

    // this.leftKey?.on("up", () => this.hero?.stop());
    // this.rightKey?.on("up", () => this.hero?.stop());
    // this.upKey?.on("up", () => this.hero?.stop());
    // this.downKey?.on("up", () => this.hero?.stop());

    this.fKey?.on("down", () => this.hero?.attack());
  }

  init(gameData: GameData) {
    const { quests } = gameData;
    this.quests = quests;
    this.setupControllerListener();
    this.setupListeners();
  }

  create() {
    this.gameW = this.scale.width;
    this.gameH = this.scale.height;

    this.background = this.add.image(0, 0, "background");
    this.background.setPosition(0, 0);
    this.background.setOrigin(0, 0);
    // this.background.setDisplaySize(gameH, gameH);
    //
    // this.hero = new Golden_Knight(
    //   this,
    //   TEXTURE_NAMES.GOLDEN_KNIGHT,
    //   {
    //     x: gameW / 2.7,
    //     y: gameH / 1.7,
    //   },
    //   2,
    //   GOLDEN_KNIGHT_KEYS.SLASH_RIGHT,
    //   {
    //     up: GOLDEN_KNIGHT_KEYS.IDLE_UP,
    //     down: GOLDEN_KNIGHT_KEYS.IDLE_DOWN,
    //     left: GOLDEN_KNIGHT_KEYS.IDLE_LEFT,
    //     right: GOLDEN_KNIGHT_KEYS.IDLE_RIGHT,
    //   },
    //   {
    //     up: GOLDEN_KNIGHT_KEYS.WALK_UP,
    //     down: GOLDEN_KNIGHT_KEYS.WALK_DOWN,
    //     left: GOLDEN_KNIGHT_KEYS.WALK_LEFT,
    //     right: GOLDEN_KNIGHT_KEYS.WALK_RIGHT,
    //   },
    //   {
    //     up: GOLDEN_KNIGHT_KEYS.SLASH_UP,
    //     down: GOLDEN_KNIGHT_KEYS.SLASH_DOWN,
    //     left: GOLDEN_KNIGHT_KEYS.SLASH_LEFT,
    //     right: GOLDEN_KNIGHT_KEYS.SLASH_RIGHT,
    //   },
    // );
    //
    this.physics.add
      .sprite(this.gameW / 2.5, this.gameH / 2.1, TEXTURE_NAMES.RATHALOS_HUNTER)
      .setScale(2)
      .play(RATHALOS_HUNTER_KEYS.SLASH);

    this.pet = new Pet(this, 0.7, { x: this.gameW / 4, y: this.gameH / 1.9 });

    const petSprite = this.pet.getSprite();

    petSprite.on("pointerdown", () => {
      this.selectedSprite?.unTarget();
      if (this.hasNewMessage) {
        this.hasNewMessage = false;
        petSprite?.play(CATTO_KEYS.IDLE);
      }
      if (this.taskDetailsDrawer?.isShowing) {
        this.taskDetailsDrawer?.hideDrawer();
        this.aiDialogBox?.showDrawer();

        this.pet?.target();
        this.selectedSprite = this.pet;
      } else {
        this.lastSelectedMobSprite?.target();
        this.selectedSprite = this.lastSelectedMobSprite;
        this.taskDetailsDrawer?.showDrawer();
        this.aiDialogBox?.hideDrawer();
      }
    });

    this.setupKeyboardEvents();

    this.taskDetailsDrawer = new TaskDetailsDrawer(this, 25, 25, {
      title: this.quests![0].name,
      description: this.quests![0].description,
    });

    this.taskDetailsDrawer.init(true);

    this.aiDialogBox = new AIDialogBoxDrawer(
      this,
      25,
      25,
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lectus ex, pellentesque quis feugiat in, elementum sit amet mauris. Cras eu sem vel velit fermentum tincidunt ut a est.\n\nAliquam dapibus ac arcu rhoncus tempus. Phasellus in tincidunt justo, ut posuere nunc.",
    );
    this.aiDialogBox.init(false);

    // simulate new task update
    this.input.keyboard?.addKey("U").on("down", () => {
      this.reSpawnMobs();
      // this.taskDetailsDrawer
      //   ?.setTitle("New Title")
      //   .setDescription(
      //     "New description for this task\n\nVestibulum tortor felis, facilisis at iaculis commodo, dapibus et libero.\n\nNullam sit amet hendrerit erat, eu dapibus orci.",
      //   );
      //
      // this.taskDetailsDrawer?.reAdjustSpacing();

      this.hasNewMessage = true;
      this.pet?.getSprite()?.play(CATTO_KEYS.JUMP);
      // set cattoAlert play to Jumping
      this.aiDialogBox
        ?.setMessage("Message has been updated.\n\nAnother line for testing...")
        .reAdjustSpacing();
    });

    // new Skeleton(this, 2, { x: 360, y: gameH / 2 });
    // new Ogre(this, 2, { x: 370, y: gameH / 2 }).getSprite().setSize(64, 64);

    this.spawnMobs(this.quests);
    EventBus.emit("current-scene-ready", this);
  }

  onHit(e: Animations.Animation, damage: number, attackKey: string) {
    if (e.key.includes(attackKey)) {
      if (this.isHeroNearAnEnemy) {
        console.log("HIT!", damage);
      } else {
        console.log("MISS!");
      }
    }
  }

  spawnMobs(quests: Quest[]): Phaser.GameObjects.Container | undefined {
    this.mobsContainer = this.add.container(this.gameW / 1.7, this.gameH / 2.5);

    // generate coords
    let generatedCoords: Coordinates[] = [];

    // max 12 sprites
    // max 4 on
    // max 3 on y
    // we set it to 96 since if we use 64, some sprites overlap
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        generatedCoords = [
          ...generatedCoords,
          {
            x: i * 96,
            y: j * 96,
          },
        ];
      }
    }

    let coordsWithIndex: { index: number; coords: Coordinates }[] = [];
    let mobSprites:
      | Phaser.Physics.Arcade.Sprite[]
      | Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];

    for (let i = 0; i < quests.length; i++) {
      let mob;

      if (i === 0) {
        // 0x96
        // if first, highlight the first mob,
        // select the 0x96 c, coordsoords which is right next to the hero
        mob = this.setMob(quests[i].modelName, generatedCoords[1]);
        generatedCoords.splice(1, 1);
        mob.target();
        this.selectedSprite = mob;
        coordsWithIndex = [
          ...coordsWithIndex,
          {
            index: i,
            coords: generatedCoords[1],
          },
        ];
      } else {
        const randomIndex = Math.floor(Math.random() * generatedCoords.length);
        const selectedCoords = generatedCoords[randomIndex];
        mob = this.setMob(quests[i].modelName, selectedCoords);
        generatedCoords.splice(randomIndex, 1);

        coordsWithIndex = [
          ...coordsWithIndex,
          {
            index: i,
            coords: selectedCoords,
          },
        ];
      }

      const mobSprite = mob.getSprite();

      mobSprite.on("pointerdown", () => this.onSelectMob(mob, quests[i]));

      // mobsContainer.add(mobSprite);
      mobSprites = [...mobSprites, mobSprite];
    }

    // rearrange the depth of each mobsprite
    coordsWithIndex.sort((a, b) => {
      if (a.coords.y < b.coords.y) {
        return -1;
      } else if (a.coords.y === b.coords.y) {
        return 0;
      } else {
        return 1;
      }
    });

    for (const c of coordsWithIndex) {
      const { index } = c;
      this.mobsContainer?.add(mobSprites[index]);
    }
    return this.mobsContainer;
  }

  reSpawnMobs() {
    this.mobsContainer?.destroy();
    this.spawnMobs(this.quests);
  }

  setMob(mob: string, coords: Coordinates) {
    switch (mob) {
      case "goblin":
        return new Goblin(this, 2, coords);
      case "ogre":
        return new Ogre(this, 2.5, coords);

      case "bug":
        return new Bug(this, 2, coords);
      default:
        return new Skeleton(this, 2, coords);
    }
  }

  onSelectMob(mob: Unit, quest: Quest) {
    this.selectedSprite?.unTarget();
    this.selectedSprite = mob;
    this.lastSelectedMobSprite = mob;
    mob.target(); // set tint
    this.taskDetailsDrawer
      ?.setTitle(quest.name)
      .setDescription(quest.description);

    this.taskDetailsDrawer?.reAdjustSpacing();

    if (this.aiDialogBox?.isShowing) {
      this.aiDialogBox?.hideDrawer();
      this.taskDetailsDrawer?.showDrawer();
    }
  }

  onReceivedQuests(gameData: GameData) {
    this.quests = gameData.quests;
    this.reSpawnMobs();
    this.taskDetailsDrawer
      ?.setTitle(this.quests[0].name)
      .setDescription(this.quests[0].description);

    this.taskDetailsDrawer?.reAdjustSpacing();
  }

  update() {
    // const heroCoor: { x: number; y: number } = this.hero!.getCoordinates();
    // const distance = Phaser.Math.Distance.Between(
    //   heroCoor.x,
    //   heroCoor.y,
    //   this.skeleton.x,
    //   this.skeleton.y,
    // );
    //
    // if (distance > 200) {
    //   // far away, miss the attack
    //   this.isHeroNearAnEnemy = false;
    // } else {
    //   // near, damage it!!
    //   //
    //   this.isHeroNearAnEnemy = true;
    // }
  }
}
