import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("transactions");

  const renderContent = () => {
    switch (activeTab) {
      case "transactions":
        return (
          <div>
            <h3>Daily Transactions</h3>
            <p>Here you can view and manage your daily transactions.</p>
            {/* Add transaction list/table here */}
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2026-03-15</td>
                    <td>Grocery Shopping</td>
                    <td>-$85.50</td>
                    <td>Expense</td>
                  </tr>
                  <tr>
                    <td>2026-03-15</td>
                    <td>Salary Deposit</td>
                    <td>+$3000.00</td>
                    <td>Income</td>
                  </tr>
                  {/* Add more sample data */}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "assets":
        return (
          <div>
            <h3>Assets & Liabilities</h3>
            <p>Overview of your financial position.</p>
            <div className="row">
              <div className="col-md-6">
                <h4>Assets</h4>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    Cash <span>$5,000</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    Investments <span>$25,000</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    Real Estate <span>$150,000</span>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <h4>Liabilities</h4>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    Mortgage <span>$120,000</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    Credit Card <span>$2,500</span>
                  </li>
                </ul>
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
      </ul>
      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
