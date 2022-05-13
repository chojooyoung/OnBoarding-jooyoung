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
    <ButtonWrapper>
      <SubmitButton
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </SubmitButton>
    </ButtonWrapper>
  );
}

export default Button;

const ButtonWrapper = styled.div`
  text-align: right;
`;

const SubmitButton = styled.button<{
  type?: "submit" | "reset" | "button";
  disabled: boolean;
  className: string;
  children: ReactNode;
}>`
  font-size: 20px;
  width: 100px;
  height: 40px;
  text-align: center;
  color: white;
  background-color: #486ba2;
  border: none 1px black;
  border-radius: 3px;
  :hover {
    background-color: #c2d5f2;
  }
`;
