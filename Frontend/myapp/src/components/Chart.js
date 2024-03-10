// src/components/Chart.js

import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    // Fetch data from MongoDB
    axios.get('http://localhost:8000/api/data') // Assuming your backend server is running on port 8000
      .then(response => {
        const data = response.data;

        const labels = data.map(item => item.topic);
        const intensityData = data.map(item => item.intensity);
        const likelihoodData = data.map(item => item.likelihood);

        // Create chart
        new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Intensity',
                data: intensityData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              },
              {
                label: 'Likelihood',
                data: likelihoodData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
