import Card from "../../../components/Card";
import type { DebtCreditDto } from "../../../utils/apiService";

interface AssetsTabProps {
  debtCredits: DebtCreditDto[];
  debtCreditsLoading: boolean;
  debtCreditsError: string | null;
}

const AssetsTab = ({
  debtCredits,
  debtCreditsLoading,
  debtCreditsError,
}: AssetsTabProps) => {
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
};

export default AssetsTab;
