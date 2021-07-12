import { MonthTransaction } from "../../components/Chart";
import { Transaction, TransactionType } from "../../models/Transaction";
import { monthNames } from "../constants";

export function createTransactionData(date: string): MonthTransaction {
  return {
    date,
    Crédito: 0,
    Débito: 0,
  } as MonthTransaction;
}

export function getChartDateLabel(date: Date): string {
  const dateParts = date.toString().split(" ");
  const parsedDate = `${dateParts[2]}/${dateParts[1]}`;
  return parsedDate;
}

export function sortTransactionsByDate(array: Transaction[]): Transaction[] {
  const sortedArray = array.sort((a, b) => {
    return a.date!.getDate() - b.date!.getDate();
  });
  return sortedArray;
}

export function getTotalDebit(
  transactions: Transaction[],
  formatted: boolean = false
): string | number {
  const debts = transactions.filter((t) => t.type === TransactionType.Out);
  const totalDebt = debts.reduce((a, b) => a + (b.value || 0), 0);
  if (formatted) {
    return toCurrency(totalDebt);
  } else {
    return totalDebt;
  }
}

export function getTotalCredit(
  transactions: Transaction[],
  formatted: boolean = false
): string | number {
  const credits = transactions.filter((t) => t.type === TransactionType.In);
  const totalCredit = credits.reduce((a, b) => a + (b.value || 0), 0);
  if (formatted) {
    return toCurrency(totalCredit);
  } else {
    return totalCredit;
  }
}

export function getTotalBalance(
  transactions: Transaction[],
  formatted: boolean = false
): string | number {
  const totalDebt = getTotalDebit(transactions) as number;
  const totalCredit = getTotalCredit(transactions) as number;
  const totalBalance = totalCredit - totalDebt;
  if (formatted) {
    return toCurrency(totalBalance);
  } else {
    return totalBalance;
  }
}

export function toCurrency(value: number): string {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `R$ ${formattedValue}`;
}

export function getMonthAbbreviation(monthIndex: number): string {
  const monthAbbreviation = monthNames[monthIndex].substr(1, 3);
  return monthAbbreviation;
}
