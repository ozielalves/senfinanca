import { useSnackbar } from "notistack";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Transaction } from "../models/Transaction";
import { currentDate, transactionCollection } from "../services/constants";
import { firestore } from "../services/firebase";

interface FinancesContextProps {
  children: ReactNode;
}

interface FinancesContextData {
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  createTransaction: (
    transaction: Transaction
  ) => Promise<Transaction | undefined>;
  editTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (tansactionId: string) => Promise<void>;
}

const TransactionsContext = createContext<FinancesContextData>(
  {} as FinancesContextData
);

export function FinancesProvider({ children }: FinancesContextProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchTransactions = useCallback(async () => {
    const transactions: Transaction[] = [];
    const snapshot = await firestore
      .collection(transactionCollection)
      .orderBy("date", "desc")
      .get()
      .catch((error) => {
        enqueueSnackbar("Erro ao recuperar as transações", {
          variant: "error",
        });
        console.log(error);
      });
    if (snapshot) {
      snapshot.docs.map((_data) =>
        transactions.push({
          ..._data.data(),
          id: _data.id,
          date: _data.data().date.toDate(),
        } as Transaction)
      );

      setTransactions(transactions);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const createTransaction = useCallback(
    async (transaction: Transaction) => {
      const docRef = await firestore
        .collection(transactionCollection)
        .add({ ...transaction, date: currentDate })
        .catch((error) => {
          enqueueSnackbar("Erro ao criar a transação", {
            variant: "error",
          });
          console.log(error);
        });
      if (docRef) {
        return {
          id: docRef.id,
          ...transaction,
        } as Transaction;
      }
    },
    [enqueueSnackbar]
  );

  const editTransaction = useCallback(
    async (transaction: Transaction) => {
      await firestore
        .collection(transactionCollection)
        .doc(transaction.id)
        .update(transaction)
        .catch((error) => {
          enqueueSnackbar("Erro ao editar a transação", {
            variant: "error",
          });
          console.log(error);
        });
    },
    [enqueueSnackbar]
  );

  const deleteTransaction = useCallback(
    async (tansactionId: string) => {
      await firestore
        .collection(transactionCollection)
        .doc(tansactionId)
        .delete()
        .catch((error) => {
          enqueueSnackbar("Erro ao deletar a transação", {
            variant: "error",
          });
          console.log(error);
        });
    },
    [enqueueSnackbar]
  );

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useFinances() {
  const context = useContext(TransactionsContext);

  return context;
}
