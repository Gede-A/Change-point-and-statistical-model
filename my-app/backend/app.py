# backend/app.py
from flask import Flask, jsonify, request
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

app = Flask(__name__)

# Load Brent oil price dataset (you may need to update the path)
data = pd.read_csv("data/brent_oil_prices.csv")

# API to retrieve historical data
@app.route('/api/historical', methods=['GET'])
def get_historical_data():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    filtered_data = data[(data['Date'] >= start_date) & (data['Date'] <= end_date)]
    return jsonify(filtered_data.to_dict(orient='records'))

# API to serve model forecast
@app.route('/api/forecast', methods=['GET'])
def get_forecast():
    model = ARIMA(data['Price'], order=(5, 1, 1))
    model_fit = model.fit()
    forecast = model_fit.forecast(steps=30)  # 30 days forecast
    return jsonify(forecast.tolist())

# API to get model performance metrics (e.g., RMSE, MAE)
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    rmse = 0.1  # Example value; calculate properly in your analysis
    mae = 0.05  # Example value; calculate properly in your analysis
    return jsonify({"rmse": rmse, "mae": mae})

if __name__ == "__main__":
    app.run(debug=True)
