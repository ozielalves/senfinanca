import { Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { ModalBodyProps, ModalBody } from "..";
import { useFinances } from "../../../hooks/useFinances";
import { Transaction } from "../../../models/Transaction";
import { ReactComponent as WarningIcon } from "../../../assets/icons/warning_amber_24px.svg";
import { Description } from "./styles";

interface DeletationModalProps
  extends Omit<ModalBodyProps, "children" | "onClickPrimaryButton"> {
  selectedTransaction: Transaction | undefined;
  resetSelectedTransaction: () => void;
}

function DeletionModal({
  open,
  onClose,
  selectedTransaction,
  resetSelectedTransaction,
}: DeletationModalProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { deleteTransaction, fetchTransactions } = useFinances();

  const handleDelete = async () => {
    if (selectedTransaction) {
      await deleteTransaction(selectedTransaction.id!)
        .then(() => {
          enqueueSnackbar("Transação deletada com sucesso", {
            variant: "success",
          });
        })
        .then(async () => await fetchTransactions().then(() => handleClose()));
    }
  };

  const handleClose = async () => {
    resetSelectedTransaction();
    if (onClose) {
      onClose();
    }
  };
  return (
    <ModalBody
      open={open}
      onClose={handleClose}
      modalTitle="Confirme a deleção"
      primaryButtonText="Deletar"
      onClickPrimaryButton={handleDelete}
      tertiaryButtonText="Cancelar"
      onClickTertiaryButton={handleClose}
    >
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <WarningIcon style={{ width: 80, height: 80 }} />
        </Grid>
        <Grid item>
          <Description>
            <p>
              {`Ao confirmar, a transação de título “${selectedTransaction?.title}” será excluída
              permanentemente.`}
            </p>
          </Description>
        </Grid>
      </Grid>
    </ModalBody>
  );
}

export default DeletionModal;
