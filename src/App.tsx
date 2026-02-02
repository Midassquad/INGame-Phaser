import "./App.css";
import { PhaserGame } from "./PhaserGame";
import type { IRefPhaserGame } from "./PhaserGame";
import { useRef, useState } from "react";
import Controllers from "./ui/Controllers";
import { EventBus } from "./game/EventBus";
import AppContainer from "./Container";
import Header from "./ui/Header";
import Settings from "./ui/Settings";
import Footer from "./ui/Footer";

function App() {
  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("quests");

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    console.log("scene", scene);
  };

  // const onPress = (type: string) => {
  //   EventBus.emit("controls-pressed", type);
  // };
  //
  const onChangeTabHandler = (header: string) => {
    console.log("header", header);
    setCurrentTab(header);
  };

  return (
    <>
      <AppContainer>
        {/* <Controllers */}
        {/*   onPressedControls={(type) => { */}
        {/*     onPress(type); */}
        {/*   }} */}
        {/* /> */}
        <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        {/* <Header onChangeTab={onChangeTabHandler} /> */}
        {/* <Footer currentTab={currentTab} /> */}
        {/* <Settings currentTab={currentTab} /> */}
      </AppContainer>
    </>
  );
}

export default App;
