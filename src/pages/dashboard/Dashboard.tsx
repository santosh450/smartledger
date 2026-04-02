import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";
import {
  debtCreditApi,
  transactionApi,
  type DebtCreditDto,
  type TransactionDto,
} from "../../utils/apiService";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("transactions");
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null,
  );
  const [debtCredits, setDebtCredits] = useState<DebtCreditDto[]>([]);
  const [debtCreditsLoading, setDebtCreditsLoading] = useState(false);
  const [debtCreditsError, setDebtCreditsError] = useState<string | null>(null);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savingDaily, setSavingDaily] = useState(false);

  const [personalForm, setPersonalForm] = useState({
    date: "",
    person: "",
    amount: "",
    type: "Taken",
    notes: "",
    mode: "PhonePay",
  });

  const [dailyForm, setDailyForm] = useState({
    date: "",
    type: "expense",
    item: "",
    amount: "",
    notes: "",
    mode: "PhonePay",
  });

  const fetchTransactions = async () => {
    setTransactionsLoading(true);
    setTransactionsError(null);
    try {
      const data = await transactionApi.getAllTransactions();
      setTransactions(data);
    } catch (err) {
      if (err instanceof Error) {
        setTransactionsError(err.message || "Failed to load transactions.");
      } else {
        setTransactionsError("Failed to load transactions.");
      }
    } finally {
      setTransactionsLoading(false);
    }
  };

  const fetchDebtCreditRecords = async () => {
    setDebtCreditsLoading(true);
    setDebtCreditsError(null);
    try {
      const data = await debtCreditApi.getAllDebtCreditRecords();
      setDebtCredits(data);
    } catch (err) {
      if (err instanceof Error) {
        setDebtCreditsError(
          err.message || "Failed to load debt/credit records.",
        );
      } else {
        setDebtCreditsError("Failed to load debt/credit records.");
      }
    } finally {
      setDebtCreditsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchDebtCreditRecords();
  }, []);

  const handleAddPersonalTransaction = async () => {
    setAdminMessage(null);
    setAdminError(null);

    if (
      !personalForm.date ||
      !personalForm.person ||
      !personalForm.amount ||
      !personalForm.type ||
      !personalForm.mode
    ) {
      setAdminError("Please fill all required personal transaction fields.");
      return;
    }

    setSavingPersonal(true);
    try {
      await debtCreditApi.createDebtCreditRecord({
        date: personalForm.date,
        person: personalForm.person,
        type: personalForm.type,
        amount: Number(personalForm.amount),
        mode: personalForm.mode,
        notes: personalForm.notes,
      });
      setAdminMessage("Personal transaction added successfully.");
      setPersonalForm({
        date: "",
        person: "",
        amount: "",
        type: "Taken",
        notes: "",
        mode: "PhonePay",
      });
      await fetchDebtCreditRecords();
    } catch (err) {
      if (err instanceof Error) {
        setAdminError(err.message || "Failed to add personal transaction.");
      } else {
        setAdminError("Failed to add personal transaction.");
      }
    } finally {
      setSavingPersonal(false);
    }
  };

  const handleAddDailyTransaction = async () => {
    setAdminMessage(null);
    setAdminError(null);

    if (
      !dailyForm.date ||
      !dailyForm.item ||
      !dailyForm.amount ||
      !dailyForm.type ||
      !dailyForm.mode
    ) {
      setAdminError("Please fill all required daily transaction fields.");
      return;
    }

    setSavingDaily(true);
    try {
      await transactionApi.createTransaction({
        date: dailyForm.date,
        type: dailyForm.type,
        amount: Number(dailyForm.amount),
        item: dailyForm.item,
        mode: dailyForm.mode,
        notes: dailyForm.notes,
      });
      setAdminMessage("Daily transaction added successfully.");
      setDailyForm({
        date: "",
        type: "expense",
        item: "",
        amount: "",
        notes: "",
        mode: "PhonePay",
      });
      await fetchTransactions();
    } catch (err) {
      if (err instanceof Error) {
        setAdminError(err.message || "Failed to add daily transaction.");
      } else {
        setAdminError("Failed to add daily transaction.");
      }
    } finally {
      setSavingDaily(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "transactions":
        return (
          <div>
            <h3>Daily Transactions</h3>
            <p>Here you can view and manage your daily transactions.</p>
            <div className="row g-3 mb-2 mt-3">
              <div className="col">
                <Card
                  name="Total expenses"
                  amount={1000}
                  backgroundColor="#ffe9e9"
                />
              </div>
              <div className="col">
                <Card
                  name="Total income"
                  amount={900}
                  backgroundColor="#e8f7ee"
                />
              </div>
            </div>
            <div className="row g-3 mb-4 mt-3">
              <div className="col">
                <Card name="exp A" amount={245} backgroundColor="#fff4d6" />
              </div>
              <div className="col">
                <Card name="exp B" amount={380} backgroundColor="#e7f0ff" />
              </div>
              <div className="col">
                <Card name="exp C" amount={125} backgroundColor="#f3e8ff" />
              </div>
              <div className="col">
                <Card name="exp D" amount={460} backgroundColor="#ffe5ec" />
              </div>
              <div className="col">
                <Card name="exp E" amount={210} backgroundColor="#e6fff7" />
              </div>
            </div>
            {/* Add transaction list/table here */}
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
      case "assets":
        return (
          <div>
            <h3>Assets & Liabilities</h3>
            <div className="row g-3 mt-1">
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Amit" amount={1420} backgroundColor="#fff4d6" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Priya" amount={980} backgroundColor="#e7f0ff" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Rahul" amount={1760} backgroundColor="#f3e8ff" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Sneha" amount={860} backgroundColor="#ffe5ec" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Vikram" amount={2230} backgroundColor="#e6fff7" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Neha" amount={1340} backgroundColor="#ffe9e9" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Karan" amount={1125} backgroundColor="#edf7d6" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Anjali" amount={1575} backgroundColor="#e8f7ee" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Rohan" amount={905} backgroundColor="#fcefd8" />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Card name="Meera" amount={1890} backgroundColor="#efe7ff" />
              </div>
            </div>
            <div className="mt-4">
              <h4>Debt/Credit Records</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Person</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Mode</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debtCreditsLoading && (
                      <tr>
                        <td colSpan={7}>Loading debt/credit records...</td>
                      </tr>
                    )}
                    {!debtCreditsLoading && debtCreditsError && (
                      <tr>
                        <td colSpan={7} className="text-danger">
                          {debtCreditsError}
                        </td>
                      </tr>
                    )}
                    {!debtCreditsLoading &&
                      !debtCreditsError &&
                      debtCredits.length === 0 && (
                        <tr>
                          <td colSpan={7}>No debt/credit records found.</td>
                        </tr>
                      )}
                    {!debtCreditsLoading &&
                      !debtCreditsError &&
                      debtCredits.map((record) => (
                        <tr key={record.id}>
                          <td>{record.date}</td>
                          <td>{record.person}</td>
                          <td>{record.type}</td>
                          <td>{record.amount}</td>
                          <td>{record.mode}</td>
                          <td>{record.notes}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "mutual-funds":
        return (
          <div>
            <h3>Mutual Funds Analysis</h3>
            <p>Performance and analysis of your mutual fund investments.</p>
            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Fund A</h5>
                    <p className="card-text">Current Value: $10,000</p>
                    <p className="text-success">+5.2% (1 Year)</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Fund B</h5>
                    <p className="card-text">Current Value: $15,000</p>
                    <p className="text-success">+3.8% (1 Year)</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Fund C</h5>
                    <p className="card-text">Current Value: $8,000</p>
                    <p className="text-danger">-1.2% (1 Year)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "stocks":
        return (
          <div>
            <h3>Stocks Analysis</h3>
            <p>Analysis and performance of your stock portfolio.</p>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Shares</th>
                    <th>Current Price</th>
                    <th>Change</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>AAPL</td>
                    <td>50</td>
                    <td>$180.50</td>
                    <td className="text-success">+2.3%</td>
                    <td>$9,025</td>
                  </tr>
                  <tr>
                    <td>GOOGL</td>
                    <td>25</td>
                    <td>$140.20</td>
                    <td className="text-danger">-1.5%</td>
                    <td>$3,505</td>
                  </tr>
                  <tr>
                    <td>MSFT</td>
                    <td>30</td>
                    <td>$380.75</td>
                    <td className="text-success">+1.8%</td>
                    <td>$11,423</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "admin":
        return (
          <div>
            <h3 className="mb-4">Admin</h3>
            {adminError && (
              <div className="alert alert-danger" role="alert">
                {adminError}
              </div>
            )}
            {adminMessage && (
              <div className="alert alert-success" role="alert">
                {adminMessage}
              </div>
            )}

            <div className="card mb-4">
              <div className="card-body">
                <h4 className="mb-3">Personal Transactions</h4>
                <div className="row g-2 align-items-end">
                  <div className="col-12 col-lg">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={personalForm.date}
                      onChange={(e) =>
                        setPersonalForm({
                          ...personalForm,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Person</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter person name"
                      value={personalForm.person}
                      onChange={(e) =>
                        setPersonalForm({
                          ...personalForm,
                          person: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0.00"
                      value={personalForm.amount}
                      onChange={(e) =>
                        setPersonalForm({
                          ...personalForm,
                          amount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Taken/Given</label>
                    <select
                      className="form-select"
                      value={personalForm.type}
                      onChange={(e) =>
                        setPersonalForm({
                          ...personalForm,
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="Taken">Taken</option>
                      <option value="Given">Given</option>
                    </select>
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Purpose</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter purpose"
                      value={personalForm.notes}
                      onChange={(e) =>
                        setPersonalForm({
                          ...personalForm,
                          notes: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Payment Type</label>
                    <select
                      className="form-select"
                      value={personalForm.mode}
                      onChange={(e) =>
                        setPersonalForm({
                          ...personalForm,
                          mode: e.target.value,
                        })
                      }
                    >
                      <option value="PhonePay">PhonePay</option>
                      <option value="Cash">Cash</option>
                      <option value="ICICI">ICICI</option>
                      <option value="SBI">SBI</option>
                      <option value="Union">Union</option>
                    </select>
                  </div>
                  <div className="col-12 col-lg-auto">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={handleAddPersonalTransaction}
                      disabled={savingPersonal}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h4 className="mb-3">Daily Transactions</h4>
                <div className="row g-2 align-items-end">
                  <div className="col-12 col-lg">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dailyForm.date}
                      onChange={(e) =>
                        setDailyForm({ ...dailyForm, date: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select"
                      value={dailyForm.type}
                      onChange={(e) =>
                        setDailyForm({ ...dailyForm, type: e.target.value })
                      }
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter item name"
                      value={dailyForm.item}
                      onChange={(e) =>
                        setDailyForm({ ...dailyForm, item: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0.00"
                      value={dailyForm.amount}
                      onChange={(e) =>
                        setDailyForm({ ...dailyForm, amount: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter description"
                      value={dailyForm.notes}
                      onChange={(e) =>
                        setDailyForm({ ...dailyForm, notes: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12 col-lg">
                    <label className="form-label">Payment Type</label>
                    <select
                      className="form-select"
                      value={dailyForm.mode}
                      onChange={(e) =>
                        setDailyForm({ ...dailyForm, mode: e.target.value })
                      }
                    >
                      <option value="PhonePay">PhonePay</option>
                      <option value="Cash">Cash</option>
                      <option value="ICICI">ICICI</option>
                      <option value="SBI">SBI</option>
                      <option value="Union">Union</option>
                    </select>
                  </div>
                  <div className="col-12 col-lg-auto">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={handleAddDailyTransaction}
                      disabled={savingDaily}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a tab to view content.</div>;
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Financial Dashboard</h1>
        <Button
          text="Logout"
          onClick={() => navigate("/")}
          variant="outline-danger"
        />
      </div>
      <ul className="nav nav-tabs" id="dashboardTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "transactions" ? "active" : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "assets" ? "active" : ""}`}
            onClick={() => setActiveTab("assets")}
          >
            Assets & Liabilities
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "mutual-funds" ? "active" : ""}`}
            onClick={() => setActiveTab("mutual-funds")}
          >
            Mutual Funds
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "stocks" ? "active" : ""}`}
            onClick={() => setActiveTab("stocks")}
          >
            Stocks
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => setActiveTab("admin")}
          >
            Admin
          </button>
        </li>
      </ul>
      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
