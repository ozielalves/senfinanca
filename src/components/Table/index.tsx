import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
} from "@material-ui/core";
import { useState } from "react";
import { tableStyles } from "./styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Transaction } from "../../models/Transaction";
import { sortTransactionsByDate, toCurrency } from "../../services/utils";
import { useTransactionFilters } from "../../hooks/useTransactionFilters";

interface TransactionsTableProps {
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

function TransactionsTable({ onEdit, onDelete }: TransactionsTableProps) {
  const classes = tableStyles();
  const { filteredTransactions } = useTransactionFilters();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowsPerPageChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+target.value);
    setPage(0);
  };

  const getLabelDisplay = ({ from, to, count }: any) => {
    return `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`;
  };

  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.td}>
                Título
              </TableCell>
              <TableCell align="left" className={classes.td}>
                Tipo
              </TableCell>
              <TableCell align="left" className={classes.td}>
                Categoria
              </TableCell>
              <TableCell align="left" className={classes.td}>
                Valor
              </TableCell>
              <TableCell align="left" className={classes.td}>
                Data
              </TableCell>
              <TableCell align="left" className={classes.td}></TableCell>
              <TableCell align="left" className={classes.td}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortTransactionsByDate(filteredTransactions)
              .reverse()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={transaction.id}
                >
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{toCurrency(transaction.value)}</TableCell>
                  <TableCell>
                    {transaction.date?.toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => onEdit(transaction)}
                      color="primary"
                      aria-label="edit transaction"
                      component="span"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => onDelete(transaction)}
                      color="primary"
                      aria-label="delete client"
                      component="span"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        component="div"
        labelDisplayedRows={getLabelDisplay}
        labelRowsPerPage="Transações por página:"
        onPageChange={(_, value) => handlePageChange(value)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </>
  );
}

export default TransactionsTable;
