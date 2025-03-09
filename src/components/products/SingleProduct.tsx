"use client";

import { ProductImages } from "@/components/products/ProductImages";
import { ProductDocument, VariantsDocument } from "@/types/types";
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Line } from "recharts";

interface SingleProduct {
  product: string;
  session: Session | null;
}

export const SingleProduct = ({ product, session }: SingleProduct) => {
  const productPlainObject: ProductDocument = JSON.parse(product);
  const [selectedVariant, setSelectedVariant] = useState<VariantsDocument>(
    productPlainObject.variants[0]
  );
  const [desiredPrice, setDesiredPrice] = useState(0);
  const [notificationTime, setNotificationTime] = useState("");
  const [priceHistory, setPriceHistory] = useState([]);
  const [predictedDiscounts, setPredictedDiscounts] = useState([]);

  useEffect(() => {
    // Simulatie van prijsvoorspelling met een AI-model
    const fetchPredictions = async () => {
      // Hier zou een echte AI-voorspellings-API worden aangeroepen
      const mockPredictions = [
        { date: "2024-03-01", price: 50 },
        { date: "2024-03-15", price: 45 },
        { date: "2024-04-01", price: 40 },
      ];
      setPredictedDiscounts(mockPredictions);
    };
    fetchPredictions();
  }, []);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-wrap justify-between gap-8">
      <div className="grow-999 basis-0">
        <ProductImages
          name={productPlainObject.name}
          selectedVariant={selectedVariant}
        />
      </div>

      <div className="sticky flex flex-col items-center justify-center w-full h-full gap-5 grow basis-600 top-8">
        <div className="w-full border border-solid rounded border-border-primary bg-background-secondary">
          <div className="flex flex-col justify-between gap-3 p-5 border-b border-solid border-border-primary">
            <h1 className="text-base font-semibold">{productPlainObject.name}</h1>
            <p className="text-sm">{productPlainObject.description}</p>
          </div>
        </div>

        {/* Lijst van verkopers */}
        <div className="w-full p-5 border border-solid rounded border-border-primary bg-background-secondary">
          <h2 className="text-lg font-semibold mb-3">Verkopers</h2>
          <ul className="space-y-3">
            {productPlainObject.sellers?.map((seller) => (
              <li key={seller.id} className="flex items-center justify-between">
                <img src={seller.logo} alt={seller.name} className="w-12 h-12" />
                <span className="text-sm">{seller.name}</span>
                <span className="text-base font-bold">€{seller.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prijsupdate-module */}
        <div className="w-full p-5 border border-solid rounded border-border-primary bg-background-secondary">
          <h2 className="text-lg font-semibold mb-3">Prijsupdate instellen</h2>
          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Gewenste prijs (€)"
              className="p-2 border rounded"
              value={desiredPrice}
              onChange={(e) => setDesiredPrice(Number(e.target.value))}
            />
            <input
              type="datetime-local"
              className="p-2 border rounded"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
            />
            <button className="p-2 bg-blue-500 text-white rounded">Stel in</button>
          </div>
        </div>

        {/* Prijsvoorspelling grafiek */}
        <div className="w-full p-5 border border-solid rounded border-border-primary bg-background-secondary">
          <h2 className="text-lg font-semibold mb-3">Voorspelde prijsdalingen</h2>
          <Line
            data={predictedDiscounts}
            dataKey="price"
            name="Prijsvoorspelling (€)"
            stroke="#8884d8"
            dot={{ r: 5 }}
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm">COMPOSITION</AccordionTrigger>
            <AccordionContent>
              <p>
                We work with monitoring programmes to ensure compliance with our
                social, environmental and health and safety standards for our
                products. To assess compliance, we have developed a programme of
                audits and continuous improvement plans.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm">CARE</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p> Caring for your clothes is caring for the environment.</p>
              <p>
                Lower temperature washes and delicate spin cycles are gentler on
                garments and help to protect the colour, shape and structure of
                the fabric. Furthermore, they reduce the amount of energy used
                in care processes.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm">ORIGIN</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              <p>
                We work with our suppliers, workers, unions and international
                organisations to develop a supply chain in which human rights
                are respected and promoted, contributing to the United Nations
                Sustainable Development Goals.
              </p>
              <p>
                Thanks to the collaboration with our suppliers, we work to know
                the facilities and processes used to manufacture our products in
                order to understand their traceability.
              </p>
              <p>Made in Portugal</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
