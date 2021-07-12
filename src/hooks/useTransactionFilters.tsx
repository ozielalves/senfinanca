import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Filters, FilterOption } from "../models/Filter";
import { Transaction } from "../models/Transaction";
import { defaultFilters, defaultFilterValue } from "../services/constants";
import { useFinances } from "./useFinances";

interface TransactionFiltersContextProps {
  children: ReactNode;
}

interface TransactionFiltersContextData {
  filteredTransactions: Transaction[];
  filters: Filters;
  filterBy: (filters: Filters) => void;
}

interface GenericObject {
  [key: string]: any;
}

const TransactionsContext = createContext<TransactionFiltersContextData>(
  {} as TransactionFiltersContextData
);

export function TransactionFiltersProvider({
  children,
}: TransactionFiltersContextProps) {
  const { transactions } = useFinances();
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([] as Transaction[]);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const applyFilters = useCallback(() => {
    let filteredTransactions = [...transactions];
    const tempFilters: GenericObject = { ...filters };

    Object.keys(tempFilters).forEach((key) => {
      if (
        key === FilterOption.Keyword &&
        tempFilters[key] !== defaultFilterValue
      ) {
        filteredTransactions = filteredTransactions.filter(
          (transaction: Transaction) =>
            transaction.title
              .toLowerCase()
              .includes(tempFilters[key].toLowerCase())
        );
      } else if (tempFilters[key] !== defaultFilterValue) {
        filteredTransactions = filteredTransactions.filter(
          (transaction: GenericObject) => transaction[key] === tempFilters[key]
        );
      }
    });

    setFilteredTransactions(filteredTransactions);
  }, [filters, transactions]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters, filters]);

  const filterBy = useCallback((filters: Filters) => {
    setFilters((prev) => {
      let newFilters: GenericObject = { ...prev };
      const tempFilters: GenericObject = { ...filters };

      Object.keys(tempFilters).forEach((key) => {
        newFilters[key] = tempFilters[key];
      });

      return newFilters as Filters;
    });
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        filteredTransactions,
        filterBy,
        filters,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionFilters() {
  const context = useContext(TransactionsContext);

  return context;
}
