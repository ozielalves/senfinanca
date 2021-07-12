import { Grid } from "@material-ui/core";
import { useFinances } from "../../hooks/useFinances";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";
import { defaultFilterValue } from "../../services/constants";
import {
  getTotalBalance,
  getTotalCredit,
  getTotalDebit,
} from "../../services/utils";
import { CSSColor } from "../../theme/types";
import ColoredCard from "../ColoredCard";

function FinanceStatus() {
  const { transactions } = useFinances();
  const { filters } = useTransactionFilters();

  const getFilteredTransactions = () => {
    if (filters.category !== defaultFilterValue) {
      return transactions.filter(
        (transaction) => transaction.category === filters.category
      );
    } else {
      return transactions;
    }
  };

  return (
    <Grid item xs={12} md={3} lg={3}>
      <Grid
        justifyContent="space-between"
        spacing={5}
        container
        direction="column"
      >
        <Grid item>
          <ColoredCard
            color={CSSColor.PrimaryLight}
            borderColor={CSSColor.Primary}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <p className="money-icon primary">$</p>
              </Grid>
              <Grid item>
                <p className="card-title primary">Saldo</p>
              </Grid>
              <Grid item>
                <p className="card-value primary">
                  {getTotalBalance(transactions, true)}
                </p>
              </Grid>
            </Grid>
          </ColoredCard>
        </Grid>
        <Grid item>
          <ColoredCard
            color={CSSColor.SuccessLight}
            borderColor={CSSColor.Success}
          >
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <p className="money-icon success">$</p>
              </Grid>
              <Grid item>
                <p className="card-title success">Crédito</p>
              </Grid>
              <Grid item>
                <p className="card-value success">
                  {getTotalCredit(getFilteredTransactions(), true)}
                </p>
              </Grid>
            </Grid>
          </ColoredCard>
        </Grid>
        <Grid item>
          <ColoredCard color={CSSColor.ErrorLight} borderColor={CSSColor.Error}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <p className="money-icon error">$</p>
              </Grid>
              <Grid item>
                <p className="card-title error">Débito</p>
              </Grid>
              <Grid item>
                <p className="card-value error">
                  {getTotalDebit(getFilteredTransactions(), true)}
                </p>
              </Grid>
            </Grid>
          </ColoredCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FinanceStatus;
