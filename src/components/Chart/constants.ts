import { MonthTransaction } from ".";
import { currentMonth, currentYear } from "../../services/constants";
import { createTransactionData, getChartDateLabel } from "../../services/utils";

const standardTransactionData: MonthTransaction[] = [
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 1))
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 5))
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 10))
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 15))
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 20))
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 25))
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 30))
  ),
];

export { standardTransactionData };
