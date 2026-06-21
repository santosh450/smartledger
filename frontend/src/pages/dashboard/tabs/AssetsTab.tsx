import { useState } from "react";
import Card from "../../../components/Card";
import type { DebtCreditDto } from "../../../utils/apiService";

interface AssetsTabProps {
  debtCredits: DebtCreditDto[];
  debtCreditsLoading: boolean;
  debtCreditsError: string | null;
  onDeleteDebtCredit: (id: number) => Promise<void>;
  onUpdateDebtCredit: (record: DebtCreditDto) => Promise<void>;
  savingDebtCredit: boolean;
}

const AssetsTab = ({
  debtCredits,
  debtCreditsLoading,
  debtCreditsError,
  onDeleteDebtCredit,
  onUpdateDebtCredit,
  savingDebtCredit,
}: AssetsTabProps) => {
  const [editingRecord, setEditingRecord] = useState<DebtCreditDto | null>(
    null,
  );

  const startEdit = (record: DebtCreditDto) => {
    setEditingRecord({ ...record });
  };

  const cancelEdit = () => {
    setEditingRecord(null);
  };

  const updateField = (field: keyof DebtCreditDto, value: string | number) => {
    if (!editingRecord) return;
    setEditingRecord({
      ...editingRecord,
      [field]: value,
    });
  };

  const saveEdit = async () => {
    if (!editingRecord) return;

    await onUpdateDebtCredit(editingRecord);
    setEditingRecord(null);
  };
  const personTotals = Object.values(
    debtCredits.reduce<Record<string, { person: string; amount: number }>>(
      (acc, record) => {
        const key = record.person?.trim().toLowerCase() || "unknown";
        const personLabel = record.person?.trim() || "Unknown";
        const sign = record.type?.trim().toLowerCase() === "taken" ? -1 : 1;
        acc[key] = {
          person: acc[key]?.person || personLabel,
          amount: (acc[key]?.amount || 0) + sign * record.amount,
        };
        return acc;
      },
      {},
    ),
  ).sort((a, b) => b.amount - a.amount);

  return (
    <div>
      <h3>Assets & Liabilities</h3>
      <div className="row g-3 mt-1">
        {debtCreditsLoading ? (
          <div className="col-12">
            <Card
              name="Loading persons..."
              amount={0}
              backgroundColor="#f8f9fa"
            />
          </div>
        ) : debtCreditsError ? (
          <div className="col-12">
            <Card
              name="Unable to load persons"
              amount={0}
              backgroundColor="#f8d7da"
            >
              <p className="mb-0 text-danger">{debtCreditsError}</p>
            </Card>
          </div>
        ) : personTotals.length > 0 ? (
          personTotals.map((person) => {
            const isNegative = person.amount < 0;
            const amountLabel = `${isNegative ? "-" : "+"}${Math.abs(person.amount)}`;
            const backgroundColor = isNegative ? "#ffe5ec" : "#e8f7ee";
            return (
              <div className="col-12 col-md-6 col-lg-4" key={person.person}>
                <Card
                  name={person.person}
                  amount={amountLabel}
                  backgroundColor={backgroundColor}
                />
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <Card
              name="No persons found"
              amount={0}
              backgroundColor="#f8f9fa"
            />
          </div>
        )}
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
                <th>Actions</th>
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
                    <td>
                      {editingRecord?.id === record.id ? (
                        <input
                          type="date"
                          className="form-control"
                          value={editingRecord.date}
                          onChange={(e) => updateField("date", e.target.value)}
                        />
                      ) : (
                        record.date
                      )}
                    </td>
                    <td>
                      {editingRecord?.id === record.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editingRecord.person}
                          onChange={(e) =>
                            updateField("person", e.target.value)
                          }
                        />
                      ) : (
                        record.person
                      )}
                    </td>
                    <td>
                      {editingRecord?.id === record.id ? (
                        <select
                          className="form-select"
                          value={editingRecord.type}
                          onChange={(e) => updateField("type", e.target.value)}
                        >
                          <option value="Taken">Taken</option>
                          <option value="Given">Given</option>
                        </select>
                      ) : (
                        record.type
                      )}
                    </td>
                    <td>
                      {editingRecord?.id === record.id ? (
                        <input
                          type="number"
                          className="form-control"
                          value={editingRecord.amount}
                          onChange={(e) =>
                            updateField("amount", Number(e.target.value))
                          }
                        />
                      ) : (
                        record.amount
                      )}
                    </td>
                    <td>
                      {editingRecord?.id === record.id ? (
                        <select
                          className="form-select"
                          value={editingRecord.mode}
                          onChange={(e) => updateField("mode", e.target.value)}
                        >
                          <option value="PhonePay">PhonePay</option>
                          <option value="Cash">Cash</option>
                          <option value="ICICI">ICICI</option>
                          <option value="SBI">SBI</option>
                          <option value="Union">Union</option>
                        </select>
                      ) : (
                        record.mode
                      )}
                    </td>
                    <td>
                      {editingRecord?.id === record.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editingRecord.notes}
                          onChange={(e) => updateField("notes", e.target.value)}
                        />
                      ) : (
                        record.notes
                      )}
                    </td>
                    <td>
                      {editingRecord?.id === record.id ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-success me-2"
                            onClick={saveEdit}
                            disabled={savingDebtCredit}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={cancelEdit}
                            disabled={savingDebtCredit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => startEdit(record)}
                            disabled={savingDebtCredit}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => onDeleteDebtCredit(record.id)}
                            disabled={savingDebtCredit}
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
    </div>
  );
};

export default AssetsTab;
