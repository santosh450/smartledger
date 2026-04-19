import Card from "../../../components/Card";
import type { TransactionDto } from "../../../utils/apiService";

interface TransactionsTabProps {
  transactions: TransactionDto[];
  transactionsLoading: boolean;
  transactionsError: string | null;
}

const TransactionsTab = ({
  transactions,
  transactionsLoading,
  transactionsError,
}: TransactionsTabProps) => {
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
            </tr>
          </thead>
          <tbody>
            {transactionsLoading && (
              <tr>
                <td colSpan={6}>Loading transactions...</td>
              </tr>
            )}
            {!transactionsLoading && transactionsError && (
              <tr>
                <td colSpan={6} className="text-danger">
                  {transactionsError}
                </td>
              </tr>
            )}
            {!transactionsLoading &&
              !transactionsError &&
              transactions.length === 0 && (
                <tr>
                  <td colSpan={6}>No transactions found.</td>
                </tr>
              )}
            {!transactionsLoading &&
              !transactionsError &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.item}</td>
                  <td>{transaction.mode}</td>
                  <td>{transaction.notes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTab;
