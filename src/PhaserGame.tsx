import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import StartGame from "./game/main";
import { EventBus } from "./game/EventBus";
import { Client } from "@stomp/stompjs";
import SCENE_NAMES from "./constants/scene_names";

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
        const { sceneName, gameData } = data;

        if (sceneName === SCENE_NAMES.LOGIN_SCREEN) {
          currentSceneInstance?.scene.stop(SCENE_NAMES.NAVBAR);
        }
        currentSceneInstance?.scene.start(sceneName, gameData);
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
