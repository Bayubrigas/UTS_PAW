import { useState, useEffect } from "react";
import CoinContext from "./CoinContext";

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h";
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": "CG-kDb6kZK43cneybdibe36F2cA" },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setAllCoin(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, []);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
