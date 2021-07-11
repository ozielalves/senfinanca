import { Card } from "./styles";
import { ThemeColor } from "../../theme/types";

export interface ColoredCardProps extends React.HTMLAttributes<HTMLDivElement> {
  color: ThemeColor;
  borderColor: ThemeColor;
  clickable?: boolean;
  selected?: boolean;
  margin?: string;
}

function ColoredCard(props: ColoredCardProps) {
  return <Card {...props}>{props.children}</Card>;
}

export default ColoredCard;
