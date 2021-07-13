import React, { ReactNode } from "react";
import { Close } from "@material-ui/icons";
import {
  Box,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  ModalProps,
  useMediaQuery,
} from "@material-ui/core";
import { Title, getModalStyle } from "./styles";
import Button from "../Button";
import Register from "./Register";
import Deletion from "./Deletion";
import Selection from "./Selection";

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
  const [modalStyle] = React.useState(getModalStyle);

  const mediumDevice = useMediaQuery("(min-width:512px)");
  const smallDevice = useMediaQuery("(min-width:344px)");

  const useModalStyles = makeStyles((theme) =>
    createStyles({
      paper: {
        position: "absolute",
        width: mediumDevice ? 512 : smallDevice ? 344 : 280,
        backgroundColor: theme.palette.background.paper,
        border: "none",
        borderRadius: "10px",
        padding: theme.spacing(3),
        outline: "none",
      },
    })
  );

  const classes = useModalStyles();

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Grid container style={modalStyle} className={classes.paper}>
        <Grid item xs>
          <Grid container justifyContent="space-between" alignItems="center">
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
        <Grid item xs={12}>
          {props.children}
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="flex-end"
            justifyContent={props.buttonsJustify ?? "space-between"}
            direction="row"
          >
            {props.tertiaryButtonText && (
              <Button
                id="modal-tertiary-button"
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

export { ModalBody, Register, Deletion, Selection };
