import { ReactNode } from "react";
import Menu from "../domain/Menu";

interface Props {
  children: ReactNode;
}

function DefaultTemplate({ children }: Props) {
  return (
    <div>
      <Menu />
      <main>{children}</main>
    </div>
  );
}

export default DefaultTemplate;
