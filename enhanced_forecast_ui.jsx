import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ForecastForm() {
  const [inputs, setInputs] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
  });
  const [prediction, setPrediction] = React.useState(null);

  const handleChange = (month, value) => {
    setInputs((prev) => ({ ...prev, [month]: value }));
  };

  const predictSales = () => {
    const values = Object.values(inputs).map(Number);
    if (values.some(isNaN)) {
      alert("Please enter all 6 months of sales.");
      return;
    }

    // Simple linear regression forecast
    const x = [1, 2, 3, 4, 5, 6];
    const y = values;
    const n = 6;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
    const sumX2 = x.reduce((a, b) => a + b * b, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const nextMonthX = 7;
    const forecast = slope * nextMonthX + intercept;

    setPrediction(Math.round(forecast));
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-6 relative">
      <div className="absolute top-4 w-full text-center text-4xl font-extrabold text-white drop-shadow-lg">
        Musa Auto Dealership
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl"
      >
        <Card className="shadow-xl rounded-2xl border-0">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Next Month Car Sales Forecast
            </h1>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((month) => (
                <div key={month} className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">
                    Sales from {month} month{month > 1 ? "s" : ""} ago:
                  </label>
                  <input
                    type="number"
                    placeholder="Enter value..."
                    value={inputs[month]}
                    onChange={(e) => handleChange(month, e.target.value)}
                    className="border rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <Button
              className="w-full mt-6 py-3 rounded-xl text-lg font-semibold shadow-md"
              onClick={predictSales}
            >
              Predict Sales
            </Button>

            {prediction !== null && (
              <div className="mt-6 text-center text-xl font-bold text-green-600">
                Forecasted Sales for Next Month: {prediction}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
