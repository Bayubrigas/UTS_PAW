import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import "./CoinDetail.css";

const CoinDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [usdValue, setUsdValue] = useState(1);
  const [coinValue, setCoinValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coinRes, chartRes] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false`),
          fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`),
        ]);

        if (!coinRes.ok || !chartRes.ok) throw new Error("Gagal memuat data.");

        const coinData = await coinRes.json();
        const chart = await chartRes.json();

        setCoin(coinData);
        setChartData(chart.prices.map(([t, p]) => [t, p]));
        setCoinValue(1 / coinData.market_data.current_price.usd);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data coin.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="loading">⏳ Memuat data...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!coin) return <div className="error">Coin tidak ditemukan.</div>;

  const price = coin.market_data.current_price.usd;
  const change = coin.market_data.price_change_percentage_30d;
  const formatNumber = (num) =>
    num?.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const handleUsdChange = (e) => {
    const value = e.target.value;
    setUsdValue(value);
    setCoinValue(value / price);
  };

  const handleCoinChange = (e) => {
    const value = e.target.value;
    setCoinValue(value);
    setUsdValue(value * price);
  };

  const chartOptions = {
    chart: {
      id: "price-chart",
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    grid: { borderColor: "#222" },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    colors: [change >= 0 ? "#00C853" : "#FF5252"],
    tooltip: {
      theme: "dark",
      x: { format: "dd MMM" },
      y: { formatter: (val) => `$${val.toLocaleString()}` },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#ccc" } },
    },
    yaxis: {
      labels: { formatter: (val) => `$${val.toFixed(0)}`, style: { colors: "#ccc" } },
    },
  };

  const chartSeries = [{ name: "Harga (USD)", data: chartData }];

  return (
    <div className="coin-detail-container">
      <div className="coin-left">
        <div className="coin-header">
          <img src={coin.image.large} alt={coin.name} className="coin-logo" />
          <div>
            <h1>{coin.name}</h1>
            <p className="symbol">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>

        <div className="price-info">
          <h2>${formatNumber(price)}</h2>
          <p className={`change ${change >= 0 ? "positive" : "negative"}`}>
            {change >= 0 ? "▲" : "▼"} {change?.toFixed(2)}% (30d)
          </p>
        </div>

        <div className="stats">
          <div>
            <p>Market Cap</p>
            <span>${formatNumber(coin.market_data.market_cap.usd)}</span>
          </div>
          <div>
            <p>24h Volume</p>
            <span>${formatNumber(coin.market_data.total_volume.usd)}</span>
          </div>
          <div>
            <p>Circulating Supply</p>
            <span>{formatNumber(coin.market_data.circulating_supply)}</span>
          </div>
        </div>

        <div className="converter">
          <h3>💱 Converter</h3>
          <div className="inputs">
            <div>
              <label>USD</label>
              <input type="number" value={usdValue} onChange={handleUsdChange} min="0" />
            </div>
            <div>
              <label>{coin.symbol.toUpperCase()}</label>
              <input
                type="number"
                value={coinValue}
                onChange={handleCoinChange}
                min="0"
                step="0.000001"
              />
            </div>
          </div>
          <p className="rate">
            1 {coin.symbol.toUpperCase()} = ${formatNumber(price)}
          </p>
        </div>
      </div>

      <div className="coin-right">
        <div className="chart-wrapper">
          <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={320} />
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
