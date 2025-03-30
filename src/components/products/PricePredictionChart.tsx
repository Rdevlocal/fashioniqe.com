// src/components/products/PricePredictionChart.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { PricePredictor } from '@/services/pricePredictor';

interface PricePredictionChartProps {
  productId: string;
}

const PricePredictionChart: React.FC<PricePredictionChartProps> = ({ productId }) => {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setLoading(true);
        const predictionData = await PricePredictor.predictPrice(productId);
        setPrediction(predictionData);
      } catch (err) {
        console.error('Error fetching price prediction:', err);
        setError('Er is een fout opgetreden bij het laden van de prijsvoorspelling.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchPrediction();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-[#0F0F0F] p-4 rounded-md animate-pulse">
        <div className="h-4 w-40 bg-gray-700 rounded mb-4"></div>
        <div className="h-40 bg-gray-800 rounded mb-2"></div>
        <div className="h-3 w-full bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error || !prediction) {
    return (
      <div className="bg-[#0F0F0F] p-4 rounded-md">
        <p className="text-red-400 text-sm">{error || 'Prijsvoorspelling niet beschikbaar'}</p>
      </div>
    );
  }

  // Combineer historische en voorspelde prijzen voor de grafiek
  const allPricePoints = [
    ...prediction.historicalPrices.map((point: any) => ({
      date: point.date,
      price: point.price,
      type: 'historical'
    })),
    // Voeg huidig prijspunt toe
    {
      date: new Date(),
      price: prediction.historicalPrices[prediction.historicalPrices.length - 1]?.price || 0,
      type: 'current'
    },
    ...prediction.predictedPrices.map((point: any) => ({
      date: point.date,
      price: point.price,
      type: 'predicted'
    }))
  ];

  // Sorteer op datum
  allPricePoints.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Maak datapunten voor de grafiek
  const maxPrice = Math.max(...allPricePoints.map(p => p.price)) * 1.1;
  const minPrice = Math.min(...allPricePoints.map(p => p.price)) * 0.9;

  // Bereken afmetingen van de SVG grafiek
  const svgWidth = 600;
  const svgHeight = 200;
  const padding = { top: 20, right: 30, bottom: 30, left: 50 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Bereken schaal voor x- en y-as
  const xScale = (point: any, index: number) => {
    return padding.left + (index / (allPricePoints.length - 1)) * graphWidth;
  };

  const yScale = (price: number) => {
    const range = maxPrice - minPrice;
    return padding.top + graphHeight - ((price - minPrice) / range) * graphHeight;
  };

  // Maak punten voor de grafieklijnen
  const historicalLinePoints = allPricePoints
    .filter(p => p.type === 'historical' || p.type === 'current')
    .map((point, index, arr) => ({
      x: xScale(point, allPricePoints.indexOf(point)),
      y: yScale(point.price),
      isLast: index === arr.length - 1
    }));

  const predictedLinePoints = allPricePoints
    .filter(p => p.type === 'current' || p.type === 'predicted')
    .map((point, index, arr) => ({
      x: xScale(point, allPricePoints.indexOf(point)),
      y: yScale(point.price),
      isFirst: index === 0
    }));

  // Maak paths voor de lijnen
  const historicalPath = historicalLinePoints.length > 1
    ? `M ${historicalLinePoints.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

  const predictedPath = predictedLinePoints.length > 1
    ? `M ${predictedLinePoints.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

  // Formateer datums voor x-as labels
  const formatDate = (date: Date) => {
    const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  // Bepaal welke datums tonen op de x-as (3-5 datums)
  const xAxisLabels = [];
  const step = Math.ceil(allPricePoints.length / 5);
  for (let i = 0; i < allPricePoints.length; i += step) {
    if (i < allPricePoints.length) {
      xAxisLabels.push({
        x: xScale(allPricePoints[i], i),
        label: formatDate(allPricePoints[i].date)
      });
    }
  }

  // Bepaal de y-as labels (3-5 prijspunten)
  const yAxisLabels = [];
  const priceStep = (maxPrice - minPrice) / 4;
  for (let i = 0; i <= 4; i++) {
    const price = minPrice + i * priceStep;
    yAxisLabels.push({
      y: yScale(price),
      label: `€${price.toFixed(2)}`
    });
  }

  // Formateer data voor de voorspelling
  const formatPredictionDate = (date: Date | null) => {
    if (!date) return 'onbekend';
    return formatDate(date);
  };

  return (
    <div className="mt-2">
      <h3 className="text-sm font-medium mb-2">Prijsverloop en voorspelling</h3>
      <div className="bg-[#0F0F0F] p-4 rounded-md">
        {/* SVG Prijsgrafiek */}
        <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
          {/* X-as en Y-as */}
          <line x1={padding.left} y1={padding.top + graphHeight} x2={padding.left + graphWidth} y2={padding.top + graphHeight} stroke="#444" strokeWidth="1" />
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + graphHeight} stroke="#444" strokeWidth="1" />
          
          {/* Y-as labels */}
          {yAxisLabels.map((label, index) => (
            <g key={`y-label-${index}`}>
              <line 
                x1={padding.left - 5} 
                y1={label.y} 
                x2={padding.left} 
                y2={label.y} 
                stroke="#444" 
                strokeWidth="1" 
              />
              <text 
                x={padding.left - 8} 
                y={label.y + 4} 
                fill="#888" 
                fontSize="10" 
                textAnchor="end"
              >
                {label.label}
              </text>
            </g>
          ))}
          
          {/* X-as labels */}
          {xAxisLabels.map((label, index) => (
            <g key={`x-label-${index}`}>
              <line 
                x1={label.x} 
                y1={padding.top + graphHeight} 
                x2={label.x} 
                y2={padding.top + graphHeight + 5} 
                stroke="#444" 
                strokeWidth="1" 
              />
              <text 
                x={label.x} 
                y={padding.top + graphHeight + 20} 
                fill="#888" 
                fontSize="10" 
                textAnchor="middle"
              >
                {label.label}
              </text>
            </g>
          ))}
          
          {/* Historische prijslijn */}
          <path
            d={historicalPath}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          
          {/* Toekomstige prijslijn (gestippeld) */}
          <path
            d={predictedPath}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* Huidig prijspunt (grote cirkel) */}
          {allPricePoints.findIndex(p => p.type === 'current') >= 0 && (
            <circle 
              cx={xScale(allPricePoints.find(p => p.type === 'current'), allPricePoints.findIndex(p => p.type === 'current'))} 
              cy={yScale(allPricePoints.find(p => p.type === 'current').price)} 
              r="5" 
              fill="#3B82F6" 
            />
          )}
          
          {/* Historische prijspunten */}
          {allPricePoints
            .filter(p => p.type === 'historical')
            .map((point, index) => (
              <circle 
                key={`historical-${index}`}
                cx={xScale(point, allPricePoints.indexOf(point))} 
                cy={yScale(point.price)} 
                r="3" 
                fill="#3B82F6" 
              />
            ))}
          
          {/* Voorspelde prijspunten */}
          {allPricePoints
            .filter(p => p.type === 'predicted')
            .map((point, index) => (
              <circle 
                key={`predicted-${index}`}
                cx={xScale(point, allPricePoints.indexOf(point))} 
                cy={yScale(point.price)} 
                r="3" 
                fill="#1D4ED8" 
              />
            ))}
          
          {/* Best time to buy marker */}
          {prediction.bestTimeToBuy && (
            <g>
              {allPricePoints.some(p => 
                p.type === 'predicted' && 
                p.date.getTime() === prediction.bestTimeToBuy.getTime()
              ) && (
                <circle 
                  cx={xScale(
                    allPricePoints.find(p => 
                      p.type === 'predicted' && 
                      p.date.getTime() === prediction.bestTimeToBuy.getTime()
                    ), 
                    allPricePoints.findIndex(p => 
                      p.type === 'predicted' && 
                      p.date.getTime() === prediction.bestTimeToBuy.getTime()
                    )
                  )} 
                  cy={yScale(prediction.lowestPredictedPrice)} 
                  r="5" 
                  fill="#10B981" 
                  stroke="#fff" 
                  strokeWidth="1" 
                />
              )}
            </g>
          )}
        </svg>

        {/* Legenda */}
        <div className="flex items-center mt-2 text-xs text-gray-400 justify-center">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 bg-blue-500 mr-1"></div>
            <span>Historische prijs</span>
          </div>
          <div className="flex items-center mr-4">
            <div className="w-3 h-0.5 bg-blue-500 mr-1 border-t border-t-blue-500 border-dashed"></div>
            <span>Voorspelde prijs</span>
          </div>
          {prediction.bestTimeToBuy && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Beste moment om te kopen</span>
            </div>
          )}
        </div>

        {/* Voorspellingsinformatie */}
        <div className="mt-4 space-y-2 text-sm">
          {prediction.predictedDiscountDate && (
            <div className="bg-blue-900 bg-opacity-20 p-2 rounded">
              <p className="font-medium">
                Verwachte korting: {prediction.predictedDiscountPercentage}% rond {formatPredictionDate(prediction.predictedDiscountDate)}
              </p>
            </div>
          )}
          
          {prediction.bestTimeToBuy && (
            <div className="bg-green-900 bg-opacity-20 p-2 rounded">
              <p className="font-medium">
                Beste moment om te kopen: {formatPredictionDate(prediction.bestTimeToBuy)} 
                {prediction.lowestPredictedPrice && ` voor €${prediction.lowestPredictedPrice.toFixed(2)}`}
              </p>
            </div>
          )}
          
          <div className="bg-gray-800 bg-opacity-30 p-2 rounded text-xs">
            <p className="font-medium mb-1">Prijstrend: {
              prediction.seasonalTrend === 'rising' ? 'Stijgend' :
              prediction.seasonalTrend === 'falling' ? 'Dalend' : 'Stabiel'
            }</p>
            <p>
              Betrouwbaarheid: {prediction.confidence}%
            </p>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-3 text-xs text-gray-400 border border-gray-700 border-dashed p-2 rounded bg-gray-900 bg-opacity-50">
            <p className="font-medium text-gray-300 mb-1">⚠️ Disclaimer</p>
            <p>Deze prijsvoorspelling is gebaseerd op historische gegevens en algoritmes. De daadwerkelijke prijsontwikkeling kan afwijken. Deze voorspelling biedt geen garantie en dient alleen ter indicatie.</p>
          </div>