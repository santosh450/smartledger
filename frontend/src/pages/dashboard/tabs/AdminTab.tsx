import { debtCreditApi, transactionApi } from "../../../utils/apiService";

interface AdminTabProps {
  adminMessage: string | null;
  adminError: string | null;
  personalForm: {
    date: string;
    person: string;
    amount: string;
    type: string;
    notes: string;
    mode: string;
  };
  setPersonalForm: (form: {
    date: string;
    person: string;
    amount: string;
    type: string;
    notes: string;
    mode: string;
  }) => void;
  dailyForm: {
    date: string;
    type: string;
    item: string;
    amount: string;
    notes: string;
    mode: string;
  };
  setDailyForm: (form: {
    date: string;
    type: string;
    item: string;
    amount: string;
    notes: string;
    mode: string;
  }) => void;
  handleAddPersonalTransaction: () => Promise<void>;
  handleAddDailyTransaction: () => Promise<void>;
  savingPersonal: boolean;
  savingDaily: boolean;
}

const AdminTab = ({
  adminMessage,
  adminError,
  personalForm,
  setPersonalForm,
  dailyForm,
  setDailyForm,
  handleAddPersonalTransaction,
  handleAddDailyTransaction,
  savingPersonal,
  savingDaily,
}: AdminTabProps) => {
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
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
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
};

export default AdminTab;
