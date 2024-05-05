import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(response => response.json())
      .then(data => {
        setStocks(data);
        setFilteredStocks(data);
      })
      .catch(error => console.error("Error fetching stocks:", error));
  }, []);

  const handleBuyStock = (stock) => {
    if (!portfolio.find(item => item.id === stock.id)) {
      setPortfolio([...portfolio, stock]);
    }
  };

  const handleSellStock = (stock) => {
    setPortfolio(portfolio.filter(item => item.id !== stock.id));
  };

  const handleSortChange = (type) => {
    setSortType(type);
    const sortedStocks = [...filteredStocks];
    if (type === "Alphabetically") {
      sortedStocks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "Price") {
      sortedStocks.sort((a, b) => a.price - b.price);
    }
    setFilteredStocks(sortedStocks);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    const filtered = type ? stocks.filter(stock => stock.type === type) : stocks;
    handleSortChange(sortType); // Re-sort after filtering
    setFilteredStocks(filtered);
  };

  return (
    <div>
      <SearchBar handleSortChange={handleSortChange} handleFilterChange={handleFilterChange} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} handleBuyStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} handleSellStock={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default App;
