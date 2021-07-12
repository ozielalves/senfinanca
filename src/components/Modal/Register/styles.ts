import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { TransactionType } from "../../../models/Transaction";
import { CSSColor } from "../../../theme/types";

interface FlagProps {
  type: TransactionType;
}

export const Flag = styled.div<FlagProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 50px;
  font-weight: bold;
  color: ${({ type }) =>
    type === TransactionType.In ? CSSColor.Success : CSSColor.Error};
  background: ${({ type }) =>
    type === TransactionType.In ? CSSColor.SuccessLight : CSSColor.ErrorLight};
  border: 2px solid
    ${({ type }) =>
      type === TransactionType.In ? CSSColor.Success : CSSColor.Error};
`;

export const Content = styled(Grid)`
  margin-top: 10px;
  margin-bottom: 50px;
`;
