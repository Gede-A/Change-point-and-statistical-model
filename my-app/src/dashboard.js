// frontend/src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [historicalData, setHistoricalData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Fetch historical data
    axios.get('http://127.0.0.1:5000/api/historical?start_date=2023-01-01&end_date=2023-12-31')
      .then(response => setHistoricalData(response.data));

    // Fetch forecast data
    axios.get('http://127.0.0.1:5000/api/forecast')
      .then(response => setForecastData(response.data));

    // Fetch performance metrics
    axios.get('http://127.0.0.1:5000/api/metrics')
      .then(response => setMetrics(response.data));
  }, []);

  return (
    <div>
      <h2>Brent Oil Price Dashboard</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={historicalData}>
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Price" stroke="#8884d8" />
          {/* Additional lines for forecast */}
        </LineChart>
      </ResponsiveContainer>
      <div>
        <h3>Model Metrics</h3>
        <p>RMSE: {metrics.rmse}</p>
        <p>MAE: {metrics.mae}</p>
      </div>
    </div>
  );
}

export default Dashboard;
