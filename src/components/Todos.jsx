import React, { useState } from 'react';
import PredictionCard from './PredictionCard';
import MeanPredictionCard from './MeanPredictionCard';

const models = [
  { title: "1 Month Prediction", modelKey: "1_month", color: "#f7931a" },
  { title: "3 Months Prediction", modelKey: "3_month", color: "#e67e22" },
  { title: "6 Months Prediction", modelKey: "6_month", color: "#e17055" },
  { title: "1 Year Prediction", modelKey: "1_year", color: "#00b894" },
  { title: "2 Years Prediction", modelKey: "2_year", color: "#0984e3" },
  { title: "5 Years Prediction", modelKey: "5_year", color: "#6c5ce7" }
];

const Todos = () => {
  const [predictions, setPredictions] = useState(Array(models.length).fill(null));

  // Callback to update prediction for each card
  const handlePrediction = (index, value) => {
    setPredictions(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <div className="predict-bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          {models.map((m, idx) => (
            <div className="col-md-6 col-lg-4 d-flex" key={m.modelKey}>
              <PredictionCard
                title={m.title}
                modelKey={m.modelKey}
                color={m.color}
                onPrediction={value => handlePrediction(idx, value)}
              />
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 d-flex">
            <MeanPredictionCard predictions={predictions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;


