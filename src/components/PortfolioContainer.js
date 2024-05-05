import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, handleSellStock }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map(stock => (
        <Stock key={stock.id} stock={stock} handleSellStock={handleSellStock} />
      ))}
    </div>
  );
}

export default PortfolioContainer;
