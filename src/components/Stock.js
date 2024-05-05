import React from "react";

function Stock({ stock, handleBuyStock, handleSellStock }) {
  const { id, ticker, name, price } = stock;

  return (
    <div className="card" onClick={() => handleBuyStock ? handleBuyStock(stock) : handleSellStock(stock)}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{ticker}: ${price}</p>
      </div>
    </div>
  );
}

export default Stock;
