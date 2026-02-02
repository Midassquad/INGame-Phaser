import "../styles/footer-styles.css";

type FooterProps = {
  currentTab: string;
};

const Footer = (props: FooterProps) => {
  return (
    <>
      <div
        id="footerContainer"
        className={props.currentTab !== "quests" ? "slide-down" : ""}
      >
        <div id="taskContainer">
          <h1>Start Hackathon Development</h1>
        </div>
      </div>
    </>
  );
};

export default Footer;
