import { Content, dashboardStyles } from "./styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Copyright from "../../components/Copyright";
import Chart from "../../components/Chart";
import Header from "../../components/Header";
import Paper from "../../components/Paper";
import { useCallback, useState } from "react";
import Button from "../../components/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "../../components/Table";
import {
  Dropdown as Filters,
  Search as SearchBar,
} from "../../components/Filters";
import {
  Deletion as TransactionDeletionModal,
  Register as TransactionRegisterModal,
  Selection as TransactionTypeSelectionModal,
} from "../../components/Modal";
import { Transaction, TransactionType } from "../../models/Transaction";
import { TransactionFiltersProvider } from "../../hooks/useTransactionFilters";
import FinanceStatus from "../../components/FinanceStatus";

function Dashboard() {
  const classes = dashboardStyles();
  const [openSelectionModal, setOpenSelectionModal] = useState(false);
  const [openTransactionRegisterModal, setOpenTransactionRegisterModal] =
    useState(false);
  const [openTransactionDeletionModal, setOpenTransactionDeletionModal] =
    useState(false);
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionType>();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();

  const toggleSelectionModalOpen = useCallback(() => {
    setOpenSelectionModal((prev) => !prev);
  }, []);

  const toggleTransactionRegisterModalOpen = useCallback(() => {
    setOpenTransactionRegisterModal((prev) => !prev);
  }, []);

  const toggleTransactionDeletionModalOpen = useCallback(() => {
    setOpenTransactionDeletionModal((prev) => !prev);
  }, []);

  const handleTransactionTypeSelect = useCallback((value: TransactionType) => {
    setSelectedTransactionType(value);
    setOpenSelectionModal(false);
    setOpenTransactionRegisterModal(true);
  }, []);

  const handleTransactionRegisterGoBack = useCallback(() => {
    setOpenTransactionRegisterModal(false);
    setOpenSelectionModal(true);
  }, []);

  const handleTransactionEdit = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setSelectedTransactionType(transaction.type);
    setOpenTransactionRegisterModal(true);
  }, []);

  const handleTransactionDelete = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenTransactionDeletionModal(true);
  }, []);

  const resetSelectedTransaction = useCallback(() => {
    setSelectedTransaction(undefined);
  }, []);

  return (
    <Content>
      <Header />
      <TransactionFiltersProvider>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container direction="row" spacing={5}>
            <Grid item xs={12} md={9} lg={9}>
              <Grid justifyContent="space-between" spacing={5} container>
                <SearchBar />
                <Grid item xs={12} md={4} lg={4}>
                  <Grid container justifyContent="flex-end">
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={toggleSelectionModalOpen}
                    >
                      Cadastrar Transação
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.marginBlock}>
                <Grid justifyContent="space-between" container>
                  <Grid item xs={6} md={4} lg={4}>
                    <Grid container direction="column">
                      <Grid item>
                        <p className="h3">Olá,</p>
                      </Grid>
                      <Grid item>
                        <p className="body-secondary">Bem-vindo de volta!</p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} md={3} lg={3}>
                    <Grid container justifyContent="flex-end">
                      <Filters />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Chart />
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <Table
                      onEdit={handleTransactionEdit}
                      onDelete={handleTransactionDelete}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <FinanceStatus />
          </Grid>
          <Copyright />
        </Container>
      </TransactionFiltersProvider>
      <TransactionTypeSelectionModal
        open={openSelectionModal}
        onClose={toggleSelectionModalOpen}
        onClickPrimaryButton={handleTransactionTypeSelect}
      />
      <TransactionRegisterModal
        open={openTransactionRegisterModal}
        onClose={toggleTransactionRegisterModalOpen}
        transactionType={selectedTransactionType!}
        onClickSecondaryButton={handleTransactionRegisterGoBack}
        selectedTransaction={selectedTransaction}
        resetSelectedTransaction={resetSelectedTransaction}
      />
      <TransactionDeletionModal
        open={openTransactionDeletionModal}
        onClose={toggleTransactionDeletionModalOpen}
        selectedTransaction={selectedTransaction}
        resetSelectedTransaction={resetSelectedTransaction}
      />
    </Content>
  );
}

export default Dashboard;
