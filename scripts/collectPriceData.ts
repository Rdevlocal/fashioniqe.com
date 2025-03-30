// scripts/collectPriceData.ts
// Script om dagelijks of wekelijks prijsgegevens te verzamelen voor analyse

import { connectDB } from '../src/libs/mongodb';
import mongoose from 'mongoose';
import { PriceHistory } from '../src/models/PriceHistory';

/**
 * Deze functie verzamelt de huidige prijzen van alle producten
 * en slaat deze op in de price_history collectie.
 * 
 * Je kunt dit script uitvoeren met:
 * npx ts-node scripts/collectPriceData.ts
 * 
 * Of inplannen via een cron job voor regelmatige updates.
 */
async function collectPriceData() {
  console.log('=== PRIJSGEGEVENS VERZAMELEN ===');
  console.log('Start tijd:', new Date().toISOString());
  
  try {
    // 1. Verbinding maken met de database
    console.log('Verbinding maken met database...');
    await connectDB();
    console.log('Verbinding gemaakt met database!');
    
    // 2. Haal alle producten op
    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    const products = await productsCollection.find({}).toArray();
    
    console.log(`${products.length} producten gevonden.`);
    
    // 3. Maak een teller aan voor statistieken
    let updatedCount = 0;
    let skippedCount = 0;
    let totalProducts = products.length;
    
    // 4. Loop door elk product en sla de huidige prijs op
    console.log('Begin met verzamelen van prijsgegevens...');
    
    for (const product of products) {
      const productId = product._id.toString();
      const currentPrice = product.price;
      
      // Sla producten over zonder geldige prijs
      if (!currentPrice || isNaN(currentPrice)) {
        console.log(`Product overgeslagen (${productId}): Ongeldige prijs ${currentPrice}`);
        skippedCount++;
        continue;
      }
      
      // Huidige datum en tijd
      const now = new Date();
      
      // Voeg prijsdata toe aan de price_history collectie
      await PriceHistory.updateOne(
        { productId },
        { 
          $push: { 
            prices: { 
              price: currentPrice, 
              date: now 
            } 
          },
          $set: { lastUpdated: now }
        },
        { upsert: true }
      );
      
      updatedCount++;
      
      // Log voortgang elke 100 producten
      if (updatedCount % 100 === 0) {
        console.log(`Voortgang: ${updatedCount}/${totalProducts} producten verwerkt`);
      }
    }
    
    // 5. Log statistieken
    console.log('\n=== RESULTATEN ===');
    console.log(`Totaal aantal producten: ${totalProducts}`);
    console.log(`Bijgewerkte producten: ${updatedCount}`);
    console.log(`Overgeslagen producten: ${skippedCount}`);
    console.log('Prijsgegevens verzamelen voltooid!');
    
  } catch (error) {
    // 6. Foutafhandeling
    console.error('FOUT bij verzamelen van prijsgegevens:', error);
  } finally {
    // 7. Sluit de databaseverbinding
    console.log('Database verbinding sluiten...');
    await mongoose.connection.close();
    console.log('Database verbinding gesloten');
    console.log('Eind tijd:', new Date().toISOString());
  }
}

// Voer de functie uit als dit script direct wordt uitgevoerd
if (require.main === module) {
  collectPriceData()
    .then(() => {
      console.log('Script succesvol uitgevoerd!');
      process.exit(0);
    })
    .catch(err => {
      console.error('Script fout:', err);
      process.exit(1);
    });
}

// Exporteer de functie zodat deze elders kan worden gebruikt
export { collectPriceData };