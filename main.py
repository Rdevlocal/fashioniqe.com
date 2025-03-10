import os
import pandas as pd
import numpy as np
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import datetime
from flask import Flask, request, jsonify

app = Flask(__name__)

# Connect to MongoDB
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGODB_URI)
db = client['fashion_db']
collection = db['clothes_pricing']

# Fetch data from MongoDB
data = list(collection.find())
df = pd.DataFrame(data)

# Preprocess data
df['release_date'] = pd.to_datetime(df['release_date'])
df['date'] = pd.to_datetime(df['date'])
df['days_since_release'] = (df['date'] - df['release_date']).dt.days

# Add holiday features
def is_black_friday(date):
    return date.month == 11 and (date.day >= 23 and date.day <= 29) and date.weekday() == 4

def is_holiday(date):
    holidays = [
        datetime.date(date.year, 1, 1),  # New Year's Day
        datetime.date(date.year, 2, 14),  # Valentine's Day
        datetime.date(date.year, 12, 24),  # Christmas Eve
        datetime.date(date.year, 12, 25),  # Christmas
        datetime.date(date.year, 12, 5),  # Sinterklaas
        datetime.date(date.year, 4, 27),  # King's Day 
        datetime.date(date.year, 10, 31),  # Halloween
        datetime.date(date.year, 3, 17),  # St. Patrick's Day
        datetime.date(date.year, 12, 31)  # New Year's Eve
    ]
    return date.date() in holidays or is_black_friday(date)

df['is_holiday'] = df['date'].apply(is_holiday)

# Prepare features and target
features = ['days_since_release', 'is_holiday']
X = df[features]
y = df['price']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

# Function to predict the cheapest price date
def predict_cheapest_date(release_date):
    future_dates = pd.date_range(start=release_date, periods=365)
    future_data = pd.DataFrame({
        'date': future_dates,
        'days_since_release': (future_dates - release_date).days,
        'is_holiday': future_dates.map(is_holiday)
    })
    future_data['predicted_price'] = model.predict(future_data[features])
    cheapest_date = future_data.loc[future_data['predicted_price'].idxmin()]['date']
    return cheapest_date

@app.route('/predict_cheapest_date', methods=['POST'])
def predict_cheapest_date_endpoint():
    release_date_str = request.json.get('release_date')
    release_date = pd.to_datetime(release_date_str)
    cheapest_date = predict_cheapest_date(release_date)
    return jsonify({
        'release_date': release_date_str,
        'cheapest_date': cheapest_date.date().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True)