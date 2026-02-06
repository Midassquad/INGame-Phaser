import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import StartGame from "./game/main";
import { EventBus } from "./game/EventBus";
import SCENE_NAMES from "./constants/scene_names";
import { Client } from "@stomp/stompjs";
import { getTasks } from "./services/inGameServices";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
  function PhaserGame({ currentActiveScene }, ref) {
    const game = useRef<Phaser.Game | null>(null!);
    const [currentSceneInstance, setCurrentSceneInstance] =
      useState<Phaser.Scene>();

    const [previousScene, setPreviousScene] = useState<string>("");

    const [isSettingsShowing, setIsSettingsShowing] = useState<boolean>(false);

    useLayoutEffect(() => {
      if (game.current === null) {
        game.current = StartGame("game-container");

        if (typeof ref === "function") {
          ref({ game: game.current, scene: null });
        } else if (ref) {
          ref.current = { game: game.current, scene: null };
        }
      }

      return () => {
        if (game.current) {
          game.current.destroy(true);
          if (game.current !== null) {
            game.current = null;
          }
        }
      };
    }, [ref]);

    useEffect(() => {
      EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
        setCurrentSceneInstance(scene_instance);
        if (currentActiveScene && typeof currentActiveScene === "function") {
          currentActiveScene(scene_instance);
        }

        if (typeof ref === "function") {
          ref({ game: game.current, scene: scene_instance });
        } else if (ref) {
          ref.current = { game: game.current, scene: scene_instance };
        }
      });

      EventBus.on("change-scene", (data) => {
        const { sceneName, quests } = data;
        // currentSceneInstance?.scene.launch(SCENE_NAMES.NAVBAR).start(sceneName);
        if (sceneName === SCENE_NAMES.SETTINGS) {
          console.log("a");
          setIsSettingsShowing(true);
          currentSceneInstance?.scene.start(sceneName, { quests });
        } else {
          console.log("b");
          setIsSettingsShowing(false);
          if (isSettingsShowing) {
            console.log("b.1");
            currentSceneInstance?.scene.start(sceneName, { quests });
          } else {
            console.log("b.2");
            currentSceneInstance?.scene.start(sceneName, { quests });
          }
        }
      });

      return () => {
        EventBus.removeListener("current-scene-ready");
        EventBus.removeListener("change-scene");
      };
    }, [currentActiveScene, ref, currentSceneInstance]);

    const handleMessage = (body) => {
      console.log(body);
      const { actionObject, actionOperation, boards } = body;
      const { cards } = boards[0];

      if (actionObject === "CARD" && actionOperation === "UPDATE") {
        EventBus.emit("quests-received", { quests: cards });
      }
    };

    useEffect(() => {
      // Define and immediately call an async function inside useEffect
      // (async () => {
      //   const response = await getTasks();
      //   EventBus.emit("quests-received", response);
      // })();

      const client = new Client({
        brokerURL: "ws://34.135.16.205:80/ingame-websocket",
        onConnect: () => {
          console.log("Connected");
          // Subscribe to a destination
          client.subscribe("/topic/greetings", (message) => {
            if (message.body && message.body !== "null") {
              handleMessage(JSON.parse(message.body));
            }
          });
        },
      });
      client.activate();

      return () => {
        client.deactivate();
      };
    }, []);

    // useEffect(() => {
    //   // Create WebSocket connection.
    //   const socket = new WebSocket(
    //     "ws://34.135.16.205:80/ingame-websocket",
    //   );
    //
    //   // Connection opened
    //   socket.addEventListener("open", (event) => {
    //     socket.send("Hello Server!");
    //   });
    //
    //   // Listen for messages
    //   socket.addEventListener("message", handleMessage);
    //
    //   return () => {
    //     socket.removeEventListener("message", handleMessage);
    //   };
    // }, []);

    return <div id="game-container"></div>;
  },
);
