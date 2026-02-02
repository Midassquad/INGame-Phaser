import "../styles/settings-styles.css";

type SettingsProps = {
  currentTab: string;
};

const Settings = (props: SettingsProps) => {
  return (
    <div
      id="settings-container"
      className={props.currentTab === "settings" ? "fade-in" : "fade-out"}
    >
      SETTINGS
    </div>
  );
};

export default Settings;
