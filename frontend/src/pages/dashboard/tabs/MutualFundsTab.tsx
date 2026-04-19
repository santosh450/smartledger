const MutualFundsTab = () => {
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
};

export default MutualFundsTab;
