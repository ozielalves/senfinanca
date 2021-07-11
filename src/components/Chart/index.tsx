import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import { useSnackbar } from "notistack";
import { currentMonth, currentMonthName } from "../../services/constants";
import { Transaction } from "../../models/Transaction";
import { getChartDateLabel, sortTransactionsByDate } from "../../services/utils";
import { standardTransactionData } from "./constants";
import Paper from "../Paper";
import { HEXColor } from "../../theme/types";
import { ChartTitle } from "./styles";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";

interface MonthTransaction {
  date: string;
  value: number;
}

export default function Chart() {
  const theme = useTheme();
  const { filteredTransactions } = useTransactionFilters();
  const { enqueueSnackbar } = useSnackbar();
  const [monthTransactions, setMonthTransactions] =
    useState<MonthTransaction[]>();

  const getSerializedTransactions = useCallback(
    (transactions: Transaction[]) => {
      return transactions.map(
        (t) =>
          Object({
            date: getChartDateLabel(t.date!),
            value: Math.round(t.value),
          }) as MonthTransaction
      );
    },
    []
  );

  const getCurrentMonthTransactions = useCallback(() => {
    const currentMonthTransactions = filteredTransactions.filter(
      (t) => t.date?.getMonth() === currentMonth
    );
    const currentMonthTransactionsSorted = sortTransactionsByDate(currentMonthTransactions);
    const serializedTransactions = getSerializedTransactions(
      currentMonthTransactionsSorted
    );
    return serializedTransactions;
  }, [getSerializedTransactions, filteredTransactions]);

  useEffect(() => {
    const currentMonthTransactions = getCurrentMonthTransactions();
    if (currentMonthTransactions.length > 0) {
      setMonthTransactions(currentMonthTransactions);
    } else {
      setMonthTransactions(standardTransactionData);
    }
  }, [enqueueSnackbar, getCurrentMonthTransactions]);

  return (
    <Paper height={240}>
      <ChartTitle>{`Finanças - ${currentMonthName}`}</ChartTitle>
      <ResponsiveContainer>
        <LineChart
          data={monthTransactions}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 16,
          }}
        >
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
          <Line
            type="monotone"
            dataKey="value"
            stroke={HEXColor.Primary}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
