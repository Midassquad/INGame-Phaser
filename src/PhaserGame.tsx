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

      EventBus.on("change-scene", (sceneName: string) => {
        // currentSceneInstance?.scene.launch(SCENE_NAMES.NAVBAR).start(sceneName);
        if (sceneName === SCENE_NAMES.SETTINGS) {
          console.log("a");
          setIsSettingsShowing(true);
          currentSceneInstance?.scene.start(sceneName);
        } else {
          console.log("b");
          setIsSettingsShowing(false);
          if (isSettingsShowing) {
            console.log("b.1");
            currentSceneInstance?.scene.start(sceneName);
          } else {
            console.log("b.2");
            currentSceneInstance?.scene.start(sceneName);
          }
        }
      });

      return () => {
        EventBus.removeListener("current-scene-ready");
        EventBus.removeListener("change-scene");
      };
    }, [currentActiveScene, ref, currentSceneInstance]);

    return <div id="game-container"></div>;
  },
);
