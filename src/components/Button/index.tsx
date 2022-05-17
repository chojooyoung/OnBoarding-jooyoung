import styled from "@emotion/styled";
import { ReactNode } from "react";

interface Props {
  // eslint-disable-next-line react/require-default-props
  type?: "submit" | "reset" | "button";
  // eslint-disable-next-line react/require-default-props
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  className: string;
  children: ReactNode;
}

function Button({ type, onClick, disabled, className, children }: Props) {
  return (
    <CommonButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </CommonButton>
  );
}

export default Button;

const CommonButton = styled.button<{
  type?: "submit" | "reset" | "button";
  disabled: boolean;
  className: string;
  children: ReactNode;
}>`
  width: 50px;
  height: 20px;
  text-align: center;
  color: white;
  background-color: #486ba2;
  border: none 1px black;
  border-radius: 3px;
  :hover {
    background-color: #c2d5f2;
  }
`;
