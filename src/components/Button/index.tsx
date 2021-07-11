import { ReactNode } from "react";
import { CustomButton } from "./styles";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  startIcon?: ReactNode;
  variant: "contained" | "outlined" | "text";
  color?: "primary" | "secondary";
  disabled?: boolean;
  width?: string;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  return (
    <CustomButton
      variant={props.variant}
      color={props.color}
      width={props.width}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className="box">
        {props.startIcon && <div className="icon">{props.startIcon}</div>}
        {props.children}
      </div>
    </CustomButton>
  );
}

export default Button;
