import styled from "@emotion/styled";
import { ReactNode } from "react";

interface Props {
  className: string;
  children: ReactNode;
}

function Button({ className, children }: Props) {
  return <CommonButton className={className}>{children}</CommonButton>;
}

export default Button;

const CommonButton = styled.button<{ className: string; children: ReactNode }>`
  width: 300px;
  height: 500px;
`;
