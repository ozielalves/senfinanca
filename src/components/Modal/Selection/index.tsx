import { Grid } from "@material-ui/core";
import { useState } from "react";
import { ModalBodyProps, ModalBody } from "..";
import { TransactionType } from "../../../models/Transaction";
import { CSSColor } from "../../../theme/types";
import ColoredCard from "../../ColoredCard";

interface SelectionModalProps
  extends Omit<ModalBodyProps, "children" | "onClickPrimaryButton"> {
  onClickPrimaryButton: (value: TransactionType) => void;
}

function SelectionModal({
  open,
  onClose,
  onClickPrimaryButton,
}: SelectionModalProps) {
  const [optionSelected, setOptionSelected] = useState<TransactionType>();

  const handleSelection = (value: TransactionType) => {
    setOptionSelected(value);
  };
  const handleClose = () => {
    setOptionSelected(undefined);
    if (onClose) {
      onClose();
    }
  };
  return (
    <ModalBody
      open={open}
      onClose={handleClose}
      modalTitle="Selecione o tipo da transação"
      primaryButtonText="Continuar"
      onClickPrimaryButton={() => onClickPrimaryButton(optionSelected!)}
      primaryButtonDisable={!optionSelected}
      tertiaryButtonText="Cancelar"
      onClickTertiaryButton={handleClose}
    >
      <Grid container direction="row" justifyContent="center" spacing={8}>
        <Grid xs={6} item>
          <ColoredCard
            color={CSSColor.SuccessLight}
            borderColor={CSSColor.Success}
            onClick={() => handleSelection(TransactionType.In)}
            selected={optionSelected === TransactionType.In}
            margin="50px 0"
            clickable
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <p className="money-icon success">$</p>
              </Grid>
              <Grid item>
                <p className="card-title success">{TransactionType.In}</p>
              </Grid>
            </Grid>
          </ColoredCard>
        </Grid>
        <Grid xs={6} item>
          <ColoredCard
            color={CSSColor.ErrorLight}
            borderColor={CSSColor.Error}
            onClick={() => handleSelection(TransactionType.Out)}
            selected={optionSelected === TransactionType.Out}
            margin="50px 0"
            clickable
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <p className="money-icon error">$</p>
              </Grid>
              <Grid item>
                <p className="card-title error">{TransactionType.Out}</p>
              </Grid>
            </Grid>
          </ColoredCard>
        </Grid>
      </Grid>
    </ModalBody>
  );
}

export default SelectionModal;
