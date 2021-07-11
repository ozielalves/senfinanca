import { Filters } from "../models/Filter";
import {
  TransactionType,
  TransactionCategory,
} from "./../models/Transaction/index";
import { getMonthAbbreviation } from "./utils";

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const currentDate = new Date();

const currentMonth = currentDate.getMonth();

const currentMonthName = monthNames[currentMonth];

const currentMonthAbbreviation = getMonthAbbreviation(currentMonth);

const currentYear = currentDate.getFullYear();

const transactionCollection = "transactions";

const transactionTypes = [TransactionType.In, TransactionType.Out];

const transactionCategories = [
  TransactionCategory.Clothing,
  TransactionCategory.Education,
  TransactionCategory.Food,
  TransactionCategory.Others,
  TransactionCategory.Services,
  TransactionCategory.Transport,
];

const defaultFilterValue = "";

const defaultFilters: Filters = {
  keyword: defaultFilterValue,
  type: defaultFilterValue,
  category: defaultFilterValue,
};

export {
  monthNames,
  currentDate,
  currentMonth,
  currentYear,
  currentMonthName,
  currentMonthAbbreviation,
  transactionCollection,
  transactionTypes,
  transactionCategories,
  defaultFilterValue,
  defaultFilters,
};
