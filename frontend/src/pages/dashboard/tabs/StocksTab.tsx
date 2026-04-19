const StocksTab = () => {
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
};

export default StocksTab;
