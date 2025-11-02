import React, { useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        const data = await response.json();
        setCoinData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  if (loading) return <div className="coin-page">Loading...</div>;

  if (!coinData) return <div className="coin-page">Coin tidak ditemukan.</div>;

  return (
    <div className="coin-page">
      <div className="coin-header">
        <img src={coinData.image.large} alt={coinData.name} />
        <h1>{coinData.name}</h1>
        <p className="symbol">{coinData.symbol.toUpperCase()}</p>
      </div>

      <div className="coin-info">
        <p>
          <strong>Harga Saat Ini:</strong> ${coinData.market_data.current_price.usd.toLocaleString()}
        </p>
        <p>
          <strong>Market Cap:</strong> ${coinData.market_data.market_cap.usd.toLocaleString()}
        </p>
        <p>
          <strong>Peringkat:</strong> #{coinData.market_cap_rank}
        </p>
        <p>
          <strong>Perubahan 24 jam:</strong> {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      <div className="coin-description">
        <h3>Deskripsi</h3>
        <p dangerouslySetInnerHTML={{ __html: coinData.description.en.split(". ")[0] + "." }} />
      </div>
    </div>
  );
};

export default Coin;
