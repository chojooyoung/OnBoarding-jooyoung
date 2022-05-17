import { ReactNode } from "react";
import Menu from "../domain/Menu";

interface Props {
  children: ReactNode;
}

function DefaultTemplate({ children }: Props) {
  return (
    <div style={{ margin: 0 }}>
      <Menu />
      <main>{children}</main>
    </div>
  );
}
export default DefaultTemplate;
