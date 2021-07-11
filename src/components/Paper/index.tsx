import { CustomPaper } from "./styles";

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number;
}

function Paper(props: PaperProps) {
  return <CustomPaper {...props}>{props.children}</CustomPaper>;
}

export default Paper;
