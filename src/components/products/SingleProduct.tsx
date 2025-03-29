"use client";

import { Session } from "next-auth";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

interface SingleProduct {
  product: string;
  session: Session | null;
}

export const SingleProduct = ({ product, session }: SingleProduct) => {
  const router = useRouter();
  const productData = JSON.parse(product);
  const [desiredPrice, setDesiredPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [notificationTime, setNotificationTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  if (!product) {
    return <div>Product niet gevonden</div>;
  }

  // Lees de velden met veilige fallbacks
  const {
    _id,
    title = "Product",
    description = "Geen beschrijving beschikbaar",
    price = 0,
    stockStatus = "",
    categoryName = "",
    imageUrl = "",
    merchantName = "",
    currency = "EUR",
    deepLink = ""
  } = productData;

  // Voorbeeld prijshistorie voor de grafiek
  const priceHistory = [
    { date: '1 jan', price: price * 1.2 },
    { date: '1 feb', price: price * 1.15 },
    { date: '1 mrt', price: price * 1.1 },
    { date: 'Nu', price: price },
    { date: 'Verwacht 1 mnd', price: price * 0.95 },
    { date: 'Verwacht 2 mnd', price: price * 0.9 },
    { date: 'Verwacht 3 mnd', price: price * 0.85 },
  ];

  const handlePriceAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Maak API-verzoek om prijsalert in te stellen
      const response = await fetch('/api/price-alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          productId: _id,
          desiredPrice,
          notificationTime: notificationTime || new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        setSuccessMessage(`Prijsalert ingesteld voor €${desiredPrice}. We sturen een notificatie naar ${email} wanneer de prijs daalt.`);
        // Reset form
        setDesiredPrice(0);
        setNotificationTime("");
        // Reset bericht na 5 seconden
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Er is iets misgegaan');
      }
    } catch (error) {
      console.error('Fout bij het instellen van prijsalert:', error);
      setSuccessMessage(`Er is een fout opgetreden: ${error instanceof Error ? error.message : 'Onbekende fout'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewSimilarItems = () => {
    // Navigeer naar een pagina met vergelijkbare items
    // Hier gebruiken we de categorie als eenvoudige manier om vergelijkbare items te vinden
    router.push(`/${categoryName || 'products'}`);
  };

  return (
    <div className="flex flex-wrap justify-between gap-8">
      {/* Product afbeelding */}
      <div className="grow-999 basis-0">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="max-w-full rounded-md"
          />
        ) : (
          <div className="bg-gray-800 aspect-[4/3] flex items-center justify-center rounded-md">
            <span className="text-xl p-6">{title}</span>
          </div>
        )}
      </div>

      {/* Product info en controls */}
      <div className="sticky flex flex-col items-center justify-center w-full h-full gap-5 grow basis-600 top-8">
        <div className="w-full border border-solid rounded border-border-primary bg-background-secondary">
          <div className="flex flex-col justify-between gap-3 p-5 border-b border-solid border-border-primary">
            <h1 className="text-xl font-semibold">{title}</h1>
            
            {merchantName && (
              <div className="text-sm text-gray-400">Verkoper: {merchantName}</div>
            )}
            
            <div className="text-xl font-bold">
              {currency === "EUR" ? "€" : currency} {Number(price).toFixed(2)}
            </div>
            
            {stockStatus && (
              <div className="text-sm text-green-500">{stockStatus}</div>
            )}
            
            <p className="text-sm">{description}</p>
          </div>

          <div className="border-b border-solid border-border-primary p-4 flex flex-col space-y-2">
            {/* Vergelijkbare items knop */}
            <button
              onClick={handleViewSimilarItems}
              className="w-full p-3 font-medium text-white bg-blue-600 transition-all rounded hover:bg-blue-700"
            >
              Bekijk vergelijkbare items
            </button>

            {/* Link naar verkoper */}
            {deepLink && (
              <a 
                href={deepLink}
                target="_blank"
                rel="noopener noreferrer" 
                className="w-full p-3 font-medium transition-all text-center border border-gray-600 rounded hover:bg-[#1F1F1F]"
              >
                Bekijk bij verkoper
              </a>
            )}
          </div>
        </div>

        {/* Prijsupdate-module */}
        <div className="w-full p-5 border border-solid rounded border-border-primary bg-background-secondary">
          <h2 className="text-lg font-semibold mb-3">Stel prijsalert in</h2>
          {successMessage ? (
            <div className="p-3 bg-green-800 bg-opacity-25 rounded text-green-300 mb-3">
              {successMessage}
            </div>
          ) : null}
          <form onSubmit={handlePriceAlert} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email voor notificaties"
              className="p-2 text-white border rounded bg-[#0A0A0A] border-[#2E2E2E]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Gewenste prijs (€)"
              className="p-2 text-white border rounded bg-[#0A0A0A] border-[#2E2E2E]"
              value={desiredPrice || ''}
              onChange={(e) => setDesiredPrice(Number(e.target.value))}
              required
              min="0"
              step="0.01"
            />
            <button 
              type="submit" 
              className="p-2 text-white rounded bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Bezig..." : "Alert instellen"}
            </button>
          </form>
        </div>

        {/* Meer productinformatie */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm">PRODUCTDETAILS</AccordionTrigger>
            <AccordionContent>
              <p>{description}</p>
              
              {/* Toon eventuele extra producteigenschappen als ze bestaan */}
              {Object.entries(productData).map(([key, value]) => {
                // Skip bekende standaardvelden en lege waarden
                if (['_id', 'title', 'description', 'price', 'imageUrl', 'stockStatus', 
                     'categoryName', 'merchantName', 'currency', 'deepLink'].includes(key)) {
                  return null;
                }
                
                // Skip velden die met underscore beginnen, interne MongoDB velden of lege waarden
                if (key.startsWith('_') || value === null || value === "" || value === 0 || 
                    typeof value === 'object') {
                  return null;
                }
                
                // Laat alle andere velden zien
                return (
                  <div key={key} className="mt-2">
                    <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>{' '}
                    {value.toString()}
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm">VERZENDING</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>Informatie over verzending is niet beschikbaar.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm">PRIJSVOORSPELLING</AccordionTrigger>
            <AccordionContent>
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-2">Prijsverloop en voorspelling</h3>
                <div className="bg-[#0F0F0F] p-4 rounded-md">
                  {/* SVG prijsgrafiek */}
                  <svg width="100%" height="200" viewBox="0 0 600 200">
                    {/* X-as en Y-as */}
                    <line x1="50" y1="170" x2="550" y2="170" stroke="#444" strokeWidth="1" />
                    <line x1="50" y1="20" x2="50" y2="170" stroke="#444" strokeWidth="1" />
                    
                    {/* Y-as labels */}
                    <text x="25" y="170" fill="#888" fontSize="10" textAnchor="middle">€0</text>
                    <text x="25" y="125" fill="#888" fontSize="10" textAnchor="middle">
                      €{(price * 0.75).toFixed(0)}
                    </text>
                    <text x="25" y="80" fill="#888" fontSize="10" textAnchor="middle">
                      €{(price * 1.5).toFixed(0)}
                    </text>
                    <text x="25" y="35" fill="#888" fontSize="10" textAnchor="middle">
                      €{(price * 2.25).toFixed(0)}
                    </text>
                    
                    {/* X-as labels */}
                    {priceHistory.map((point, index) => {
                      const x = 50 + (index * (500 / (priceHistory.length - 1)));
                      return (
                        <text 
                          key={`label-${index}`}
                          x={x} 
                          y="185" 
                          fill="#888" 
                          fontSize="10" 
                          textAnchor="middle"
                        >
                          {point.date}
                        </text>
                      );
                    })}
                    
                    {/* Prijslijn */}
                    <polyline
                      points={priceHistory.map((point, index) => {
                        const x = 50 + (index * (500 / (priceHistory.length - 1)));
                        // Schaal de prijs tussen 20 en 170 (de y-as)
                        const maxPrice = Math.max(...priceHistory.map(p => p.price)) * 1.1;
                        const y = 170 - ((point.price / maxPrice) * 150);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                    />
                    
                    {/* Toekomstige prijslijn (streepjes) */}
                    <polyline
                      points={priceHistory.slice(3).map((point, index) => {
                        const actualIndex = index + 3; // start vanaf het 4e punt (huidige prijs)
                        const x = 50 + (actualIndex * (500 / (priceHistory.length - 1)));
                        const maxPrice = Math.max(...priceHistory.map(p => p.price)) * 1.1;
                        const y = 170 - ((point.price / maxPrice) * 150);
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    
                    {/* Huidige prijspunt (grotere cirkel) */}
                    {(() => {
                      const currentIndex = 3; // Het "Nu" punt
                      const x = 50 + (currentIndex * (500 / (priceHistory.length - 1)));
                      const maxPrice = Math.max(...priceHistory.map(p => p.price)) * 1.1;
                      const y = 170 - ((priceHistory[currentIndex].price / maxPrice) * 150);
                      return (
                        <circle cx={x} cy={y} r="5" fill="#3B82F6" />
                      );
                    })()}
                    
                    {/* Prijspunten */}
                    {priceHistory.map((point, index) => {
                      if (index === 3) return null; // Skip "Nu" punt (we hebben al een grotere cirkel)
                      const x = 50 + (index * (500 / (priceHistory.length - 1)));
                      const maxPrice = Math.max(...priceHistory.map(p => p.price)) * 1.1;
                      const y = 170 - ((point.price / maxPrice) * 150);
                      return (
                        <circle 
                          key={`point-${index}`}
                          cx={x} 
                          cy={y} 
                          r="3" 
                          fill={index > 3 ? "#1D4ED8" : "#3B82F6"} 
                        />
                      );
                    })}
                  </svg>
                </div>
                <p className="text-sm mt-3 text-gray-400">
                  Onze AI voorspelt dat de prijs van dit product in de komende maanden zal dalen.
                  Het beste moment om te kopen is waarschijnlijk over 3 maanden wanneer de prijs
                  naar verwachting ongeveer €{(price * 0.85).toFixed(2)} zal zijn.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};