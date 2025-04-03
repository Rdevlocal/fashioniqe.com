// src/components/products/PricePredictionChart.tsx
import React, { useEffect, useState } from 'react';

// Interfaces
interface PricePoint {
  price: number;
  date: Date;
  type: 'historical' | 'current' | 'predicted';
}

interface PredictionData {
  historicalPrices: { price: number; date: Date }[];
  predictedPrices: { price: number; date: Date }[];
  confidence: number;
  bestTimeToBuy: Date | null;
  lowestPredictedPrice: number | null;
  predictedDiscountDate: Date | null;
  predictedDiscountPercentage: number | null;
  seasonalTrend: 'rising' | 'falling' | 'stable';
}

interface PricePredictionChartProps {
  productId: string;
}

// Mock price prediction service
const mockPricePredictor = {
  predictPrice: async (productId: string): Promise<PredictionData> => {
    // This would be replaced with an actual API call in production
    const today = new Date();
    
    // Generate historical data
    const historicalPrices = [];
    for (let i = 180; i >= 0; i -= 15) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Add some random variations to create realistic price history
      const randomFactor = Math.sin(i / 30) * 10 + (Math.random() * 5 - 2.5);
      const price = 100 + randomFactor;
      
      historicalPrices.push({
        date: new Date(date),
        price: Math.round(price * 100) / 100
      });
    }
    
    // Generate future predictions
    const predictedPrices = [];
    let basePrice = historicalPrices[historicalPrices.length - 1].price;
    
    for (let i = 15; i <= 90; i += 15) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      // Create a downward trend with some random variations
      const trend = -0.05; // 5% downward trend per period
      const randomFactor = (Math.random() * 0.06) - 0.03; // ±3% random variation
      
      basePrice = basePrice * (1 + trend + randomFactor);
      
      predictedPrices.push({
        date: new Date(date),
        price: Math.round(basePrice * 100) / 100
      });
    }
    
    // Find lowest predicted price point
    const lowestPrediction = [...predictedPrices].sort((a, b) => a.price - b.price)[0];
    
    // Find a good discount date
    const discountDate = new Date();
    discountDate.setDate(today.getDate() + 45); // 1.5 months in the future
    
    return {
      historicalPrices,
      predictedPrices,
      bestTimeToBuy: lowestPrediction.date,
      lowestPredictedPrice: lowestPrediction.price,
      predictedDiscountDate: discountDate,
      predictedDiscountPercentage: 15,
      confidence: 70,
      seasonalTrend: 'falling'
    };
  }
};

const PricePredictionChart: React.FC<PricePredictionChartProps> = ({ productId }) => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setLoading(true);
        // In a real app, this would call the actual service
        const predictionData = await mockPricePredictor.predictPrice(productId);
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

  // Combine historical and predicted prices for chart
  const allPricePoints: PricePoint[] = [
    ...prediction.historicalPrices.map((point) => ({
      date: point.date,
      price: point.price,
      type: 'historical' as const
    })),
    // Add current price point
    {
      date: new Date(),
      price: prediction.historicalPrices[prediction.historicalPrices.length - 1]?.price || 0,
      type: 'current' as const
    },
    ...prediction.predictedPrices.map((point) => ({
      date: point.date,
      price: point.price,
      type: 'predicted' as const
    }))
  ];

  // Sort by date
  allPricePoints.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Get max and min prices for chart scaling
  const maxPrice = Math.max(...allPricePoints.map(p => p.price)) * 1.1;
  const minPrice = Math.min(...allPricePoints.map(p => p.price)) * 0.9;

  // Calculate chart dimensions
  const svgWidth = 600;
  const svgHeight = 200;
  const padding = { top: 20, right: 30, bottom: 30, left: 50 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Scale functions for x and y axes
  const xScale = (index: number) => {
    return padding.left + (index / (allPricePoints.length - 1)) * graphWidth;
  };

  const yScale = (price: number) => {
    const range = maxPrice - minPrice;
    return padding.top + graphHeight - ((price - minPrice) / range) * graphHeight;
  };

  // Create points for chart lines
  const historicalLinePoints = allPricePoints
    .filter(p => p.type === 'historical' || p.type === 'current')
    .map((point, index, arr) => ({
      x: xScale(allPricePoints.indexOf(point)),
      y: yScale(point.price),
      isLast: index === arr.length - 1
    }));

  const predictedLinePoints = allPricePoints
    .filter(p => p.type === 'current' || p.type === 'predicted')
    .map((point, index, arr) => ({
      x: xScale(allPricePoints.indexOf(point)),
      y: yScale(point.price),
      isFirst: index === 0
    }));

  // Create paths for lines
  const historicalPath = historicalLinePoints.length > 1
    ? `M ${historicalLinePoints.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

  const predictedPath = predictedLinePoints.length > 1
    ? `M ${predictedLinePoints.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

  // Format dates for display
  const formatDate = (date: Date) => {
    const months = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  // X-axis labels (3-5 dates)
  const xAxisLabels = [];
  const step = Math.ceil(allPricePoints.length / 5);
  for (let i = 0; i < allPricePoints.length; i += step) {
    if (i < allPricePoints.length) {
      xAxisLabels.push({
        x: xScale(i),
        label: formatDate(allPricePoints[i].date)
      });
    }
  }

  // Y-axis labels (price points)
  const yAxisLabels = [];
  const priceStep = (maxPrice - minPrice) / 4;
  for (let i = 0; i <= 4; i++) {
    const price = minPrice + i * priceStep;
    yAxisLabels.push({
      y: yScale(price),
      label: `€${price.toFixed(2)}`
    });
  }

  return (
    <div className="mt-2">
      <h3 className="text-sm font-medium mb-2">Prijsverloop en voorspelling</h3>
      <div className="bg-[#0F0F0F] p-4 rounded-md">
        {/* SVG Price Chart */}
        <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
          {/* X and Y axes */}
          <line x1={padding.left} y1={padding.top + graphHeight} x2={padding.left + graphWidth} y2={padding.top + graphHeight} stroke="#444" strokeWidth="1" />
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + graphHeight} stroke="#444" strokeWidth="1" />
          
          {/* Y-axis labels */}
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
          
          {/* X-axis labels */}
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
          
          {/* Historical price line */}
          <path
            d={historicalPath}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          
          {/* Future price line (dashed) */}
          <path
            d={predictedPath}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          
          {/* Current price point (large circle) */}
          {allPricePoints.findIndex(p => p.type === 'current') >= 0 && (
            <circle 
              cx={xScale(allPricePoints.findIndex(p => p.type === 'current'))} 
              cy={yScale(allPricePoints.find(p => p.type === 'current')!.price)} 
              r="5" 
              fill="#3B82F6" 
            />
          )}
          
          {/* Historical price points */}
          {allPricePoints
            .filter(p => p.type === 'historical')
            .map((point, index) => (
              <circle 
                key={`historical-${index}`}
                cx={xScale(allPricePoints.indexOf(point))} 
                cy={yScale(point.price)} 
                r="3" 
                fill="#3B82F6" 
              />
            ))}
          
          {/* Predicted price points */}
          {allPricePoints
            .filter(p => p.type === 'predicted')
            .map((point, index) => (
              <circle 
                key={`predicted-${index}`}
                cx={xScale(allPricePoints.indexOf(point))} 
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
                p.date.getTime() === prediction.bestTimeToBuy!.getTime()
              ) && (
                <circle 
                  cx={xScale(
                    allPricePoints.findIndex(p => 
                      p.type === 'predicted' && 
                      p.date.getTime() === prediction.bestTimeToBuy!.getTime()
                    )
                  )} 
                  cy={yScale(prediction.lowestPredictedPrice || 0)} 
                  r="5" 
                  fill="#10B981" 
                  stroke="#fff" 
                  strokeWidth="1" 
                />
              )}
            </g>
          )}
        </svg>

        {/* Legend */}
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

        {/* Prediction information */}
        <div className="mt-4 space-y-2 text-sm">
          {prediction.predictedDiscountDate && (
            <div className="bg-blue-900 bg-opacity-20 p-2 rounded">
              <p className="font-medium">
                Verwachte korting: {prediction.predictedDiscountPercentage}% rond {formatDate(prediction.predictedDiscountDate)}
              </p>
            </div>
          )}
          
          {prediction.bestTimeToBuy && (
            <div className="bg-green-900 bg-opacity-20 p-2 rounded">
              <p className="font-medium">
                Beste moment om te kopen: {formatDate(prediction.bestTimeToBuy)} 
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
        </div>
      </div>
    </div>
  );
};

export { PricePredictionChart };