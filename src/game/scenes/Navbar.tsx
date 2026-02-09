import { Scene } from "phaser";
import TEXTURE_NAMES from "../../constants/texture_names";
import { EventBus } from "../EventBus";
import SCENE_NAMES from "../../constants/scene_names";
import type { GameData, Quest } from "../../types/global.types";
import { Client } from "@stomp/stompjs";
import {
  talkAI,
  WEBSOCKET_URL,
  WS_SUB_URL,
} from "../../services/inGameServices";
import NAVBAR_ICONS from "../../constants/navbar_icons";

export class Navbar extends Scene {
  #gameW: number | undefined;
  #gameH: number | undefined;

  gameData: GameData;
  chatbox!: Phaser.GameObjects.DOMElement;

  navItemBg!: { [key: string]: Phaser.GameObjects.NineSlice };
  selectedNav: string;

  isChatboxShowing: boolean;

  constructor() {
    super(SCENE_NAMES.NAVBAR);

    this.isChatboxShowing = false;
    this.selectedNav = Object.keys(NAVBAR_ICONS)[0];
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
          TEXTURE_NAMES.NON_SELECTED_BG,
          0,
          columnWidth - 20,
          columnWidth - 80,
          20,
          20,
          20,
          20,
        )

        .setScale(1)
        .setInteractive({ cursor: "pointer" });

      this.navItemBg = {
        ...this.navItemBg,
        [nav]: bgNav,
      };

      // const navText = this.add
      //   .text(0, 0, nav)
      //   .setStyle({
      //     fontSize: 30,
      //     fontFamily: "PixelifySans",
      //     fill: "white",
      //     align: "center",
      //   })
      //   .setStroke("black", 3);

      const navIcon = this.add.image(0, 0, NAVBAR_ICONS[nav]);

      bgNav.on("pointerdown", () => {
        this.handleNavClick(nav);
      });

      Phaser.Display.Align.In.Center(navIcon, bgNav);

      navCont.add(bgNav);
      navCont.add(navIcon);

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
    if (this.selectedNav) {
      this.navItemBg[this.selectedNav].setTexture(
        TEXTURE_NAMES.NON_SELECTED_BG,
      );
    }
    this.selectedNav = nav;
    this.navItemBg[nav].setTexture(TEXTURE_NAMES.SELECTED_BG);
    if (nav == "Hero") {
      EventBus.emit("change-scene", {
        sceneName: SCENE_NAMES.CHARACTER_DETAILS,
        gameData: this.gameData,
      });
    }
    if (nav === "Battle") {
      // this.scene
      //   .stop(SCENE_NAMES.CHARACTER_DETAILS)
      //   .run(SCENE_NAMES.BATTLE, this.gameData);
      EventBus.emit("change-scene", {
        sceneName: SCENE_NAMES.BATTLE,
        gameData: this.gameData,
      });
    }
    if (nav === "Logout") {
      EventBus.emit("change-scene", {
        sceneName: SCENE_NAMES.LOGIN_SCREEN,
        gameData: this.gameData,
      });
    }
  }

  setupWebsocket() {
    const client = new Client({
      brokerURL: WEBSOCKET_URL,
      onConnect: () => {
        console.log("Connected");
        // Subscribe to a destination
        client.subscribe(WS_SUB_URL, (message) => {
          if (message.body && message.body !== "null") {
            const body = JSON.parse(message.body);
            console.log("body", body);

            const { actionObject, actionOperation, actionType, boards } = body;
            const { cards, lists } = boards[0];

            if (actionObject === "CARD" && actionOperation === "UPDATE") {
              // check if cards is from this user
              const { assignedMembers } = cards[0];
              if (
                assignedMembers.some(
                  (member) => member.username === this.gameData.username,
                )
              ) {
                // if current user belongs to assignedMembers
                const newQuest: Quest = cards[0];

                const questIndex = this.gameData.quests.findIndex(
                  (quest) => quest.trelloCardId === newQuest.trelloCardId,
                );
                console.log("questIndex", questIndex);

                if (questIndex < 0) {
                  // if not present in list, add it
                  this.gameData = {
                    username: this.gameData.username,
                    quests: [...this.gameData.quests, newQuest],
                  };
                } else {
                  // if present, just replace the new quest
                  const questStatus = lists[0].name;

                  if (questStatus === "Done") {
                    // check the status, if done, remove it
                    const questIndex = this.gameData.quests.findIndex(
                      (quest) => quest.trelloCardId === newQuest.trelloCardId,
                    );

                    if (questIndex > -1) {
                      // it exists, remove it from the list of quests
                      this.gameData = {
                        username: this.gameData.username,
                        quests: this.gameData.quests.filter(
                          (quest) =>
                            quest.trelloCardId !== newQuest.trelloCardId,
                        ),
                      };
                    }
                  } else {
                    const formatQuests = this.gameData.quests;
                    formatQuests[questIndex] = newQuest;
                    this.gameData = {
                      username: this.gameData.username,
                      quests: formatQuests,
                    };
                  }
                }

                EventBus.emit("quests-received", this.gameData);
              } else if (actionType === "removeMemberFromCard") {
                // check if cards belongs to the gameData quests, then remove it

                const newQuest: Quest = cards[0];
                const questIndex = this.gameData.quests.findIndex(
                  (quest) => quest.trelloCardId === newQuest.trelloCardId,
                );

                if (questIndex > -1) {
                  // it exists, remove it from the list of quests
                  this.gameData = {
                    username: this.gameData.username,
                    quests: this.gameData.quests.filter(
                      (quest) => quest.trelloCardId !== newQuest.trelloCardId,
                    ),
                  };
                }

                EventBus.emit("quests-received", this.gameData);
              }
            }
          }
        });
      },
    });

    client.activate();

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      console.log("de activate");
      client.deactivate();
    });
  }

  init(gameData: GameData) {
    this.gameData = gameData;
    this.setupWebsocket();
  }

  create() {
    this.#gameW = this.scale.width;
    this.#gameH = this.scale.height;

    const navItems = this.generateEachNavs(Object.keys(NAVBAR_ICONS));

    this.navItemBg[this.selectedNav].setTexture(TEXTURE_NAMES.SELECTED_BG);

    const navContainer = this.add.container(
      0,
      this.#gameH - this.#gameH * 0.12,
    );

    const bg = this.add
      .nineslice(
        0,
        0,
        TEXTURE_NAMES.MENU_BG,
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

    this.chatbox = this.add
      .dom(this.#gameW / 2, -620)
      .createFromCache("chatbox");
    this.chatbox.setOrigin(0.5, 0);
    this.scriptForChatbox();

    EventBus.emit("current-scene-ready", this);
  }

  scriptForChatbox() {
    const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById(
      "messageInput",
    ) as HTMLInputElement;
    const form = document.getElementById("messageForm");
    const footer = document.getElementById("footerChatbox");

    const generateMessageBox = (message: string, owner: string) => {
      const parentElement = document.getElementById("chatBox");

      const outerChatCont = document.createElement("div");
      outerChatCont.className = `${owner} chat-outercont`;

      const chatCont = document.createElement("div");
      chatCont.className = "chat-container";

      const chatThumb = document.createElement("div");
      chatThumb.className = "chat-thumb";

      const imgElement = document.createElement("img");
      if (owner === "user") {
        imgElement.src = "/INGame-Phaser/der_profile.png";
      } else {
        imgElement.src = "/INGame-Phaser/catto_profile.png";
      }

      chatThumb.append(imgElement);

      const chatOuterMsg = document.createElement("div");
      chatOuterMsg.className = "chat-outer-msg";

      const labelName = document.createElement("span");

      if (owner === "user") {
        labelName.textContent = this.gameData.username;
      } else {
        labelName.textContent = "P.E.T";
      }

      const chatMsg = document.createElement("div");
      chatMsg.className = "chat-msg";

      const newElement = document.createElement("p");
      newElement.textContent = message;

      chatMsg.append(newElement);
      chatOuterMsg.append(labelName, chatMsg); // here
      chatCont.append(chatThumb, chatOuterMsg);
      outerChatCont.append(chatCont);
      parentElement!.append(outerChatCont);

      messageInput.value = "";
    };

    generateMessageBox("Hello! What do you wanna chat about?", "ai");

    form!.addEventListener("submit", async (e) => {
      // PASS THE MESSAGE ON API
      e.preventDefault();

      const message = messageInput.value;

      if (!message) return;

      generateMessageBox(message, "user");

      chatBox!.scrollTop = chatBox!.scrollHeight - chatBox!.clientHeight;

      const answer = await talkAI({ message: message }, this.gameData.username);

      generateMessageBox(answer, "ai");

      chatBox!.scrollTop = chatBox!.scrollHeight - chatBox!.clientHeight;
    });

    footer!.onclick = () => {
      if (this.isChatboxShowing) {
        this.hideChatbox();
      } else {
        this.showChatbox();
      }
    };

    // add an event listener when AI speaks!!
    // then call generateMessageBox
  }

  showChatbox() {
    this.tweens.add({
      targets: this.chatbox,
      ease: "Sine",
      repeat: 0,
      duration: 200,
      y: 5,
      onComplete: () => (this.isChatboxShowing = true),
    });
  }

  hideChatbox() {
    this.tweens.add({
      targets: this.chatbox,
      ease: "Sine",
      repeat: 0,
      duration: 200,
      y: -620,
      onComplete: () => (this.isChatboxShowing = false),
    });
  }
}
