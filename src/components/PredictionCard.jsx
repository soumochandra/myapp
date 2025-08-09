import React, { useState } from 'react';

const PredictionCard = ({ title, modelKey, color }) => {
  const [formData, setFormData] = useState({
    id: '',
    open: '',
    high: '',
    low: '',
    volume: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, model: modelKey })
      });

      const data = await response.json();
      if (response.ok && data.prediction !== undefined) {
        setPrediction(data.prediction);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Unknown error occurred.");
      }
    } catch (error) {
      setError("Error connecting to backend.");
    }

    setLoading(false);
  };

  return (
    <div className="card shadow-sm border-0 mb-3" style={{ borderRadius: '1rem', maxWidth: '320px', width: '100%' }}>
      <div className="card-body p-3">
        <div className="text-center mb-2">
          <img
            src="data:image/jpeg;base64,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