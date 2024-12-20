import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      // Your Firebase service account credentials
    }),
    databaseURL: "https://your-project-id.firebaseio.com"
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productName, targetPrice } = req.body;

    if (!productName || !targetPrice) {
      return res.status(400).json({ message: 'Product name and target price are required' });
    }

    const newAlert = {
      productName,
      targetPrice: parseFloat(targetPrice),
      createdAt: new Date().toISOString()
    };

    try {
      const docRef = await db.collection('price-alerts').add(newAlert);
      res.status(201).json({ message: 'Price alert set successfully', alertId: docRef.id });
    } catch (error) {
      res.status(500).json({ message: 'Failed to set price alert', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
