import { useState } from "react";
import Card from "../../../components/Card";
import type { TransactionDto } from "../../../utils/apiService";

interface TransactionsTabProps {
  transactions: TransactionDto[];
  transactionsLoading: boolean;
  transactionsError: string | null;
  onDeleteTransaction: (id: number) => Promise<void>;
  onUpdateTransaction: (transaction: TransactionDto) => Promise<void>;
  savingTransaction: boolean;
}

const TransactionsTab = ({
  transactions,
  transactionsLoading,
  transactionsError,
  onDeleteTransaction,
  onUpdateTransaction,
  savingTransaction,
}: TransactionsTabProps) => {
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionDto | null>(null);

  const startEdit = (transaction: TransactionDto) => {
    setEditingTransaction({ ...transaction });
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
  };

  const handleFieldChange = (
    field: keyof TransactionDto,
    value: string | number,
  ) => {
    if (!editingTransaction) return;
    setEditingTransaction({
      ...editingTransaction,
      [field]: value,
    });
  };

  const saveEdit = async () => {
    if (!editingTransaction) return;
    await onUpdateTransaction(editingTransaction);
    setEditingTransaction(null);
  };

  const totalExpenses = transactions
    .filter((t) => t.type.toLocaleLowerCase() === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => t.type.toLocaleLowerCase() === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const topExpenseItems = Object.values(
    transactions
      .filter((t) => t.type.toLocaleLowerCase() === "expense")
      .reduce<Record<string, { item: string; amount: number }>>((acc, t) => {
        const key = t.item?.trim().toLowerCase() || "unknown";
        const itemLabel = t.item?.trim() || "Unknown";
        acc[key] = {
          item: acc[key]?.item || itemLabel,
          amount: (acc[key]?.amount || 0) + t.amount,
        };
        return acc;
      }, {}),
  )
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div>
      <h3>Daily Transactions</h3>
      <p>Here you can view and manage your daily transactions.</p>
      <div className="row g-3 mb-2 mt-3">
        <div className="col">
          <Card
            name="Total Expenses"
            amount={totalExpenses}
            backgroundColor="#ffe9e9"
          />
        </div>
        <div className="col">
          <Card
            name="Total Income"
            amount={totalIncome}
            backgroundColor="#e8f7ee"
          />
        </div>
      </div>
      <div className="row g-3 mb-4 mt-3">
        {topExpenseItems.length > 0 ? (
          topExpenseItems.map((expense) => (
            <div className="col" key={expense.item}>
              <Card
                name={expense.item}
                amount={expense.amount}
                backgroundColor="#fff4d6"
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <Card
              name="Top expense items"
              amount={0}
              backgroundColor="#f8f9fa"
            />
          </div>
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Item</th>
              <th>Mode</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactionsLoading && (
              <tr>
                <td colSpan={7}>Loading transactions...</td>
              </tr>
            )}
            {!transactionsLoading && transactionsError && (
              <tr>
                <td colSpan={7} className="text-danger">
                  {transactionsError}
                </td>
              </tr>
            )}
            {!transactionsLoading &&
              !transactionsError &&
              transactions.length === 0 && (
                <tr>
                  <td colSpan={7}>No transactions found.</td>
                </tr>
              )}
            {!transactionsLoading &&
              !transactionsError &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    {editingTransaction?.id === transaction.id ? (
                      <input
                        type="date"
                        className="form-control"
                        value={editingTransaction.date}
                        onChange={(e) =>
                          handleFieldChange("date", e.target.value)
                        }
                      />
                    ) : (
                      transaction.date
                    )}
                  </td>
                  <td>
                    {editingTransaction?.id === transaction.id ? (
                      <select
                        className="form-select"
                        value={editingTransaction.type}
                        onChange={(e) =>
                          handleFieldChange("type", e.target.value)
                        }
                      >
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                      </select>
                    ) : (
                      transaction.type
                    )}
                  </td>
                  <td>
                    {editingTransaction?.id === transaction.id ? (
                      <input
                        type="number"
                        className="form-control"
                        value={editingTransaction.amount}
                        onChange={(e) =>
                          handleFieldChange("amount", Number(e.target.value))
                        }
                      />
                    ) : (
                      transaction.amount
                    )}
                  </td>
                  <td>
                    {editingTransaction?.id === transaction.id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editingTransaction.item}
                        onChange={(e) =>
                          handleFieldChange("item", e.target.value)
                        }
                      />
                    ) : (
                      transaction.item
                    )}
                  </td>
                  <td>
                    {editingTransaction?.id === transaction.id ? (
                      <select
                        className="form-select"
                        value={editingTransaction.mode}
                        onChange={(e) =>
                          handleFieldChange("mode", e.target.value)
                        }
                      >
                        <option value="PhonePay">PhonePay</option>
                        <option value="Cash">Cash</option>
                        <option value="ICICI">ICICI</option>
                        <option value="SBI">SBI</option>
                        <option value="Union">Union</option>
                      </select>
                    ) : (
                      transaction.mode
                    )}
                  </td>
                  <td>
                    {editingTransaction?.id === transaction.id ? (
                      <input
                        type="text"
                        className="form-control"
                        value={editingTransaction.notes}
                        onChange={(e) =>
                          handleFieldChange("notes", e.target.value)
                        }
                      />
                    ) : (
                      transaction.notes
                    )}
                  </td>
                  <td>
                    {editingTransaction?.id === transaction.id ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm btn-success me-2"
                          onClick={saveEdit}
                          disabled={savingTransaction}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={cancelEdit}
                          disabled={savingTransaction}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => startEdit(transaction)}
                          disabled={savingTransaction}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onDeleteTransaction(transaction.id)}
                          disabled={savingTransaction}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTab;
