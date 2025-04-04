"use client";

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PricePredictionChart } from "@/components/products/PricePredictionChart";

interface RetailerInfo {
  name: string;
  price: number;
  url: string;
  inStock: boolean;
  deliveryTime?: string;
  sizes?: { size: string; price: number; inStock: boolean }[];
}

interface SingleProduct {
  product: string;
  session: Session | null;
}

export const SingleProduct = ({ product, session }: SingleProduct) => {
  const router = useRouter();
  const [desiredPrice, setDesiredPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [notificationTime, setNotificationTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderNote, setReminderNote] = useState("");
  const [retailers, setRetailers] = useState<RetailerInfo[]>([]);
  const [isLoadingRetailers, setIsLoadingRetailers] = useState(false);
  const [lowestPrice, setLowestPrice] = useState<{price: number, size?: string, retailer?: string} | null>(null);

  // Set email from session if available
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session]);

  if (!product) {
    return <div>Product niet gevonden</div>;
  }

  // Parse the product data safely
  const productData = typeof product === 'string' ? JSON.parse(product) : product;

  // Ensure we extract all possible field variations with fallbacks
  const {
    _id,
    title = productData.name || productData.product_name || "Product",
    description = productData.merchant_description || productData.aw_description || "Geen beschrijving beschikbaar",
    price = productData.display_price ? parseFloat(productData.display_price.replace(/[^0-9.]/g, '')) : 
            productData.store_price || 0,
    stockStatus = productData.availability || "in stock",
    categoryName = productData.category || productData.merchant_category || "",
    imageUrl = Array.isArray(productData.image) && productData.image.length > 0 ? productData.image[0] : 
              productData.aw_image_url || productData.merchant_image_url || "",
    merchantName = productData.merchant_name || "",
    currency = productData.currency || "EUR",
    deepLink = productData.merchant_deep_link || productData.aw_deep_link || "",
    ean = productData.ean || productData.manufacturer_part_number || ""
  } = productData;

  // Simulatie van het ophalen van retailergegevens en maten
  useEffect(() => {
    if (productData?._id) {
      fetchRetailers(productData.ean || productData._id);
    }
  }, [productData]);

  const fetchRetailers = async (eanOrId: string) => {
    setIsLoadingRetailers(true);
    
    // Simuleer een API-call met een timeout
    setTimeout(() => {
      // Mock data voor retailers met productmaten
      const mockRetailers: RetailerInfo[] = [
        {
          name: "SuperStore",
          price: price * 0.95,
          url: "https://superstore.example.com/product/" + eanOrId,
          inStock: true,
          deliveryTime: "1-2 werkdagen",
          sizes: [
            { size: "38", price: price * 0.95, inStock: true },
            { size: "39", price: price * 0.90, inStock: true },
            { size: "40", price: price * 0.95, inStock: true },
            { size: "41", price: price * 1.05, inStock: false }
          ]
        },
        {
          name: "MegaShop",
          price: price,
          url: "https://megashop.example.com/items/" + eanOrId,
          inStock: true,
          deliveryTime: "2-3 werkdagen",
          sizes: [
            { size: "38", price: price * 1.00, inStock: true },
            { size: "39", price: price * 0.95, inStock: true },
            { size: "40", price: price * 0.98, inStock: true },
            { size: "41", price: price * 1.00, inStock: true }
          ]
        },
        {
          name: "BudgetKing",
          price: price * 1.05,
          url: "https://budgetking.example.com/product/" + eanOrId,
          inStock: false,
          sizes: [
            { size: "38", price: price * 1.05, inStock: false },
            { size: "39", price: price * 1.10, inStock: false },
            { size: "40", price: price * 1.00, inStock: false },
            { size: "41", price: price * 1.05, inStock: false }
          ]
        },
        {
          name: merchantName || "MainRetailer",
          price: price,
          url: deepLink || "#",
          inStock: true,
          deliveryTime: "1-3 werkdagen",
          sizes: [
            { size: "38", price: price * 1.00, inStock: true },
            { size: "39", price: price * 1.00, inStock: true },
            { size: "40", price: price * 1.00, inStock: true },
            { size: "41", price: price * 1.05, inStock: true }
          ]
        }
      ];
      
      // Vind de laagste prijs en de bijbehorende maat
      let lowestPriceInfo = {
        price: Number.MAX_VALUE,
        size: "",
        retailer: ""
      };
      
      mockRetailers.forEach(retailer => {
        if (retailer.sizes) {
          retailer.sizes.forEach(sizeInfo => {
            if (sizeInfo.inStock && sizeInfo.price < lowestPriceInfo.price) {
              lowestPriceInfo = {
                price: sizeInfo.price,
                size: sizeInfo.size,
                retailer: retailer.name
              };
            }
          });
        }
      });
      
      if (lowestPriceInfo.price !== Number.MAX_VALUE) {
        setLowestPrice(lowestPriceInfo);
      }
      
      // Sorteer op prijs van laag naar hoog
      mockRetailers.sort((a, b) => a.price - b.price);
      
      setRetailers(mockRetailers);
      setIsLoadingRetailers(false);
    }, 1000);
  };

  const handlePriceAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Bereid data voor
      const alertData = {
        email,
        productId: _id,
        desiredPrice,
        notificationTime: isReminderEnabled ? reminderDate : (notificationTime || new Date().toISOString()),
        reminderNote: isReminderEnabled ? reminderNote : "",
        productTitle: title,
        ean: ean || "",
        merchantName: merchantName || "",
        productImageUrl: imageUrl || ""
      };
      
      // Maak API-verzoek om prijsalert in te stellen
      const response = await fetch('/api/auth/signup/price-alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertData),
      });
      
      if (response.ok) {
        const successText = isReminderEnabled 
          ? `Prijsalert ingesteld voor €${desiredPrice}. We sturen een herinnering op ${new Date(reminderDate).toLocaleDateString()}.`
          : `Prijsalert ingesteld voor €${desiredPrice}. We sturen een notificatie naar ${email} wanneer de prijs daalt.`;
        
        setSuccessMessage(successText);
        
        // Reset form
        if (isReminderEnabled) {
          setReminderDate("");
          setReminderNote("");
        } else {
          setDesiredPrice(0);
          setNotificationTime("");
        }
        
        // Toon toast notificatie
        toast.success(successText);
        
        // Reset bericht na 5 seconden
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Er is iets misgegaan');
      }
    } catch (error) {
      console.error('Fout bij het instellen van prijsalert:', error);
      const errorMessage = error instanceof Error ? error.message : 'Onbekende fout';
      setSuccessMessage(`Er is een fout opgetreden: ${errorMessage}`);
      toast.error(`Er is een fout opgetreden: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewSimilarItems = () => {
    // Navigeer naar een pagina met vergelijkbare items
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
            
            {ean && (
              <div className="text-xs text-gray-400">EAN: {ean}</div>
            )}
            
            {merchantName && (
              <div className="text-sm text-gray-400">Verkoper: {merchantName}</div>
            )}
            
            <div className="flex flex-col">
              <div className="text-xl font-bold">
                {currency === "EUR" ? "€" : currency} {Number(price).toFixed(2)}
              </div>
              
              {lowestPrice && lowestPrice.price < price && (
                <div className="text-sm text-green-500 mt-1">
                  Goedkoopste: <span className="font-bold">€{lowestPrice.price.toFixed(2)}</span> 
                  {lowestPrice.size && <span> (maat {lowestPrice.size})</span>}
                  {lowestPrice.retailer && <span> bij {lowestPrice.retailer}</span>}
                </div>
              )}
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

        {/* Retailer vergelijking module - alle maten en prijzen */}
        <div className="w-full p-5 border border-solid rounded border-border-primary bg-background-secondary">
          <h2 className="text-lg font-semibold mb-3">Vergelijk prijzen per maat</h2>
          {isLoadingRetailers ? (
            <div className="text-center py-4">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
              <p className="mt-2 text-sm text-gray-400">Prijzen worden geladen...</p>
            </div>
          ) : retailers.length > 0 ? (
            <div className="space-y-4">
              {retailers.filter(r => r.sizes && r.sizes.length > 0).map((retailer, index) => (
                <div key={index} className="p-3 rounded bg-[#0F0F0F] border border-[#2E2E2E]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{retailer.name}</span>
                    <span className={retailer.inStock ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                      {retailer.inStock ? (retailer.deliveryTime || "Op voorraad") : "Niet op voorraad"}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2 sm:grid-cols-4">
                    {retailer.sizes?.map((sizeInfo, sizeIndex) => (
                      <div 
                        key={sizeIndex} 
                        className={`p-2 text-center text-sm border rounded ${sizeInfo.inStock ? 'border-green-800' : 'border-red-800 opacity-60'}`}
                      >
                        <div className="font-medium">Maat {sizeInfo.size}</div>
                        <div className={sizeInfo.price < price ? "text-green-500 font-bold" : ""}>
                          €{sizeInfo.price.toFixed(2)}
                        </div>
                        <div className="text-xs mt-1">
                          {sizeInfo.inStock ? "Beschikbaar" : "Uitverkocht"}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-2">
                    <a 
                      href={retailer.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 text-sm hover:underline"
                    >
                      Bekijk bij {retailer.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-2 text-gray-400">Geen prijsgegevens beschikbaar</p>
          )}
        </div>

        {/* Verbeterde prijsalert module */}
        <div className="w-full p-5 border border-solid rounded border-border-primary bg-background-secondary">
          <h2 className="text-lg font-semibold mb-3">Stel prijsalert in voor dit product</h2>
          {successMessage ? (
            <div className="p-3 bg-green-800 bg-opacity-25 rounded text-green-300 mb-3">
              {successMessage}
            </div>
          ) : null}
          
          <div className="mb-4">
            <label className="flex items-center mb-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isReminderEnabled}
                onChange={() => setIsReminderEnabled(!isReminderEnabled)}
                className="mr-2 h-4 w-4"
              />
              <span className="text-sm">
                Herinner mij voor een speciale gelegenheid (verjaardag, feestdag)
              </span>
            </label>
          </div>
          
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
            
            {isReminderEnabled ? (
              <>
                <input
                  type="date"
                  className="p-2 text-white border rounded bg-[#0A0A0A] border-[#2E2E2E]"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required={isReminderEnabled}
                />
                
                <textarea
                  placeholder="Voeg een notitie toe (bijv. 'Voor Sanne's verjaardag')"
                  className="p-2 text-white border rounded bg-[#0A0A0A] border-[#2E2E2E] min-h-[80px]"
                  value={reminderNote}
                  onChange={(e) => setReminderNote(e.target.value)}
                />
              </>
            ) : null}
            
            <button 
              type="submit" 
              className="p-2 text-white rounded bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Bezig..." : isReminderEnabled ? "Stel herinnering in" : "Alert instellen"}
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
                    {(value ?? "").toString()}
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm">VERZENDING</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>Informatie over verzending is afhankelijk van de verkoper.</p>
              {retailers.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {retailers
                    .filter(r => r.deliveryTime)
                    .map((retailer, index) => (
                      <li key={index}>
                        <span className="font-medium">{retailer.name}:</span> {retailer.deliveryTime}
                      </li>
                    ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm">PRIJSVOORSPELLING</AccordionTrigger>
            <AccordionContent>
              <div className="mt-2">
                {/* Import en gebruik onze PricePredictionChart component */}
                <PricePredictionChart productId={_id.toString()} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};