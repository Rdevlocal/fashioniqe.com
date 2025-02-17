import fetch from 'node-fetch';

export async function getServerSideProps() {
  const res = await fetch('https://example.com/awin-productfeed.csv'); // Voeg de echte AWIN-URL toe
  const csvData = await res.text();
  
  // Verwerk de CSV naar JSON of een ander gewenst formaat
  const parsedData = parseCSV(csvData); // Een functie om CSV te parseren naar JSON
  
  return {
    props: {
      products: parsedData,
    },
  };
}

function parseCSV(csv) {
  // Gebruik een CSV parser zoals 'csv-parser' of een custom oplossing
  // Zorg ervoor dat je de relevante velden zoals naam, prijs, en affiliate link haalt
  return parsedData;
}

export default function Home({ products }) {
  return (
    <div>
      <h1>Producten</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <a href={product.affiliateLink}>Bekijk het product</a>
        </div>
      ))}
    </div>
  );
}
