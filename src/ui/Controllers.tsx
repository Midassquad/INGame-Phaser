import "../styles/controllers-styles.css";

type ControllerProps = {
  onPressedControls: (type: string) => void;
};

const Controllers = (props: ControllerProps) => {
  const { onPressedControls } = props;

  return (
    <>
      <div id="headerNav">
        <div id="controlsContainer">
          <div className="upControl" onClick={() => onPressedControls("up")}>
            ^
          </div>
          <div
            className="leftControl"
            onClick={() => onPressedControls("left")}
          >
            &lt;
          </div>
          <div
            className="attackControl"
            onClick={() => onPressedControls("attack")}
          >
            ATTACK
          </div>
          <div
            className="rightControl"
            onClick={() => onPressedControls("right")}
          >
            &gt;
          </div>

          <div
            className="downControl"
            onClick={() => onPressedControls("down")}
          >
            V
          </div>
        </div>
      </div>
    </>
  );
};

export default Controllers;
