import React, { ReactNode } from "react";
import { Close } from "@material-ui/icons";
import { Box, Grid, IconButton, Modal, ModalProps } from "@material-ui/core";
import { getModalStyle } from "../../services/utils";
import { Title, useModalStyles } from "./styles";
import Button from "../Button";

export interface ModalBodyProps extends ModalProps {
  /** Title displayed at the top of the modal */
  modalTitle?: ReactNode | string;
  /** Text displayed on the button to the right */
  primaryButtonText?: string;
  /** Action (Function) triggered on click the primary button */
  onClickPrimaryButton?: Function;
  /** Boolean value that determines whether the primary button is disabled or not */
  primaryButtonDisable?: boolean;
  /** Text displayed on the second button from right to left */
  secondaryButtonText?: string;
  /** Action (Function) triggered on click the secondary button */
  onClickSecondaryButton?: Function;
  /** Boolean value that determines whether the secondary button is disabled or not */
  secondaryButtonDisable?: boolean;
  /** Text displayed on the third button from right to left */
  tertiaryButtonText?: string;
  /** Action (Function) triggered on click the tertiary button */
  onClickTertiaryButton?: Function;
  /** Boolean value that determines whether the tertiary button is disabled or not */
  tertiaryButtonDisable?: boolean;
  /**
   * Justification of the modal buttons
   * @type {'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly'}
   */
  buttonsJustify?:
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-between"
    | "space-evenly";
  /** Defines whether the modal has overflow or not */
  onClose?: () => void;
}
const ModalBody = (props: ModalBodyProps) => {
  const classes = useModalStyles();
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Grid container style={modalStyle} className={classes.paper}>
        <Grid item xs>
          <Grid container item justify="space-between" alignItems="center">
            {props.modalTitle && (
              <Box flexGrow={1}>
                {typeof props.modalTitle === "string" ? (
                  <Title>{props.modalTitle}</Title>
                ) : (
                  props.modalTitle
                )}
              </Box>
            )}
            <Box>
              <IconButton onClick={props.onClose}>
                <Close />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} spacing={1}>
          {props.children}
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="flex-end"
            justify={props.buttonsJustify ?? "space-between"}
            direction="row"
          >
            {props.tertiaryButtonText && (
              <Button
                id="modal-secondary-button"
                disabled={props.tertiaryButtonDisable}
                width="135px"
                onClick={() =>
                  props.onClickTertiaryButton && props.onClickTertiaryButton()
                }
                variant="text"
                color="primary"
              >
                {props.tertiaryButtonText}
              </Button>
            )}
            {props.secondaryButtonText && (
              <Button
                id="modal-secondary-button"
                disabled={props.secondaryButtonDisable}
                width="135px"
                onClick={() =>
                  props.onClickSecondaryButton && props.onClickSecondaryButton()
                }
                variant="outlined"
                color="primary"
              >
                {props.secondaryButtonText}
              </Button>
            )}
            {props.primaryButtonText && (
              <Button
                id="modal-primary-button"
                disabled={props.primaryButtonDisable}
                width="135px"
                variant="contained"
                onClick={() =>
                  props.onClickPrimaryButton && props.onClickPrimaryButton()
                }
              >
                {props.primaryButtonText}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalBody;