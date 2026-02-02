import SCENE_NAMES from "../constants/scene_names";
import { EventBus } from "../game/EventBus";
import "../styles/header-styles.css";
type HeaderProps = {
  onChangeTab: (type: string) => void;
};
const Header = (props: HeaderProps) => {
  const { onChangeTab } = props;
  const onClickHeader = (header: string) => {
    if (header === "quests") {
      // change the scene to Battle
      EventBus.emit("change-scene", SCENE_NAMES.BATTLE);
    }
    if (header === "character") {
      // change the scene to Character Details
      EventBus.emit("change-scene", SCENE_NAMES.CHARACTER_DETAILS);
    }
    if (header === "settings") {
      // show the settings ui
      EventBus.emit("show-settings");
    }
    onChangeTab(header);
  };

  return (
    <div id="header-container">
      <div id="header-inner-container">
        <div onClick={() => onClickHeader("character")}>Character</div>
        <div onClick={() => onClickHeader("quests")}>Quests</div>
        <div onClick={() => onClickHeader("map")}>Map</div>
        <div onClick={() => onClickHeader("settings")}>Settings</div>
      </div>
    </div>
  );
};

export default Header;
