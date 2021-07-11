import { currentMonth, currentYear } from "../../services/constants";
import { createTransactionData, getChartDateLabel } from "../../services/utils";

const standardTransactionData = [
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 1)),
    0
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 5)),
    0
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 10)),
    0
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 15)),
    0
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 20)),
    0
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 25)),
    0
  ),
  createTransactionData(
    getChartDateLabel(new Date(currentYear, currentMonth, 30)),
    0
  ),
];

export { standardTransactionData };
