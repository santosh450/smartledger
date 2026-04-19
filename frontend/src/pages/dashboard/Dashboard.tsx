import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import {
  debtCreditApi,
  transactionApi,
  type DebtCreditDto,
  type TransactionDto,
} from "../../utils/apiService";
import TransactionsTab from "./tabs/TransactionsTab";
import AssetsTab from "./tabs/AssetsTab";
import MutualFundsTab from "./tabs/MutualFundsTab";
import StocksTab from "./tabs/StocksTab";
import AdminTab from "./tabs/AdminTab";

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
    type: "Expense",
    item: "",
    amount: "",
    notes: "",
    mode: "PhonePay",
  });

  const fetchTransactions = async () => {
    setTransactionsLoading(true);
    setTransactionsError(null);
    try {
      const response = await transactionApi.getAllTransactions();
      setTransactions(response.data);
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
      const response = await debtCreditApi.getAllDebtCreditRecords();
      setDebtCredits(response.data);
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
        type: "Expense",
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
          <TransactionsTab
            transactions={transactions}
            transactionsLoading={transactionsLoading}
            transactionsError={transactionsError}
          />
        );
      case "assets":
        return (
          <AssetsTab
            debtCredits={debtCredits}
            debtCreditsLoading={debtCreditsLoading}
            debtCreditsError={debtCreditsError}
          />
        );
      case "mutual-funds":
        return <MutualFundsTab />;
      case "stocks":
        return <StocksTab />;
      case "admin":
        return (
          <AdminTab
            adminMessage={adminMessage}
            adminError={adminError}
            personalForm={personalForm}
            setPersonalForm={setPersonalForm}
            dailyForm={dailyForm}
            setDailyForm={setDailyForm}
            handleAddPersonalTransaction={handleAddPersonalTransaction}
            handleAddDailyTransaction={handleAddDailyTransaction}
            savingPersonal={savingPersonal}
            savingDaily={savingDaily}
          />
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
