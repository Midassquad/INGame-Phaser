import type { ReactNode } from "react";

type ContainerProps = {
  children?: ReactNode;
};
const AppContainer = ({ children }: ContainerProps) => {
  return <div id="appContainer">{children}</div>;
};

export default AppContainer;
