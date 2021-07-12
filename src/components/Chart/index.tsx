import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  Bar,
} from "recharts";
import { currentMonth, currentMonthName } from "../../services/constants";
import { Transaction, TransactionType } from "../../models/Transaction";
import {
  getChartDateLabel,
  sortTransactionsByDate,
} from "../../services/utils";
import { standardTransactionData } from "./constants";
import Paper from "../Paper";
import { HEXColor } from "../../theme/types";
import { ChartTitle } from "./styles";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";

export interface MonthTransaction {
  date: string;
  Crédito: number;
  Débito: number;
  type?: TransactionType;
}

export default function Chart() {
  const theme = useTheme();
  const { filteredTransactions } = useTransactionFilters();
  const [monthTransactions, setMonthTransactions] = useState<
    MonthTransaction[]
  >([]);

  const getCreditTransactionsByDate = useCallback(
    (date: Date) => {
      const creditTransactionByDate = filteredTransactions.filter(
        (transaction) =>
          transaction.date === date && transaction.type === TransactionType.In
      );
      const totalCreditByDay = creditTransactionByDate.reduce(
        (a, b) => a + (b.value || 0),
        0
      );
      return totalCreditByDay;
    },
    [filteredTransactions]
  );

  const getDebitTransactionsByDate = useCallback(
    (date: Date) => {
      const debitTransactionByDate = filteredTransactions.filter(
        (transaction) =>
          transaction.date === date && transaction.type === TransactionType.Out
      );
      const totalDebitByDay = debitTransactionByDate.reduce(
        (a, b) => a + (b.value || 0),
        0
      );
      return totalDebitByDay;
    },
    [filteredTransactions]
  );

  const getSerializedTransactions = useCallback(
    (transactions: Transaction[]) => {
      const serializedTransactions = transactions.map(
        (t) =>
          Object({
            date: getChartDateLabel(t.date!),
            Crédito: getCreditTransactionsByDate(t.date!),
            Débito: getDebitTransactionsByDate(t.date!),
          }) as MonthTransaction
      );

      // merges duplicated dates
      const mergedTransactions = Array.from(
        new Set(serializedTransactions.map((t) => t.date))
      ).map((date) => {
        return {
          date: date,
          Crédito: serializedTransactions
            .filter((t) => t.date === date)
            .reduce((a, b) => a + (b.Crédito || 0), 0),
          Débito: serializedTransactions
            .filter((t) => t.date === date)
            .reduce((a, b) => a + (b.Débito || 0), 0),
        };
      });

      return mergedTransactions as MonthTransaction[];
    },

    [getCreditTransactionsByDate, getDebitTransactionsByDate]
  );

  const getCurrentMonthTransactions = useCallback(() => {
    const currentMonthTransactions = filteredTransactions.filter(
      (t) => t.date?.getMonth() === currentMonth
    );
    const currentMonthTransactionsSorted = sortTransactionsByDate(
      currentMonthTransactions
    );
    const serializedTransactions = getSerializedTransactions(
      currentMonthTransactionsSorted
    );
    return serializedTransactions;
  }, [getSerializedTransactions, filteredTransactions]);

  useEffect(() => {
    const currentMonthTransactions: MonthTransaction[] =
      getCurrentMonthTransactions();
    if (currentMonthTransactions.length > 0) {
      setMonthTransactions(currentMonthTransactions);
    } else {
      setMonthTransactions(standardTransactionData);
    }
  }, [getCurrentMonthTransactions]);

  return (
    <Paper height={240}>
      <ChartTitle>{`Finanças - ${currentMonthName}`}</ChartTitle>
      <ResponsiveContainer>
        <BarChart
          data={monthTransactions}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 16,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Valor (R$)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="Crédito" fill={HEXColor.Success} />
          <Bar dataKey="Débito" fill={HEXColor.Error} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
