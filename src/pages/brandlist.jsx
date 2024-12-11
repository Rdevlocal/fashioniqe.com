import React from 'react';
import Link from 'next/link';

const BrandList = () => {
  // List of clothing brands
  const brands = [
    'Nike',
    'Adidas',
    'Zara',
    'H&M',
    'Gucci',
    'Louis Vuitton',
    'Prada',
    'Burberry',
    'Versace',
    'Balenciaga',
    'The North Face',
    'Levi’s',
    'Tommy Hilfiger',
    'Ralph Lauren',
    'Under Armour',
    'New Balance',
    'Calvin Klein',
    'Puma',
    'Patagonia',
    'Uniqlo',
    'Lululemon',
    'Supreme',
    'Off-White',
    'Fendi',
    'Champion',
    'ASOS',
    'Shein',
    'Bershka',
    'Forever 21',
    'Urban Outfitters',
    'Guess',
    'Diesel',
    'Reebok',
    'Hugo Boss',
    'Michael Kors',
    'Alexander McQueen',
    'Stone Island',
    'Moncler',
    'Canada Goose',
    'Carhartt',
    'Converse',
    'Vans',
    'Timberland',
    'Wrangler',
    'Dockers',
    'Crocs',
    'J.Crew',
    'Abercrombie & Fitch',
    'Hollister',
    'Banana Republic',
    'Mango',
    'AllSaints',
    'COS',
    'Boohoo',
    'PrettyLittleThing',
    'Missguided',
    'GAP',
    'Armani Exchange',
    'Jack & Jones',
    'Ted Baker',
    'Lacoste',
    'Fila',
    'Billionaire Boys Club',
    'Fear of God',
    'True Religion',
    'G-Star RAW',
    'Superdry',
    'Lee',
    'Everlane',
    'Theory',
    'Etro',
    'Kenzo',
    'Zegna',
    'Ermenegildo Zegna',
    'Vince',
    'Rag & Bone',
    'Saint Laurent',
    'Balmain',
    'A.P.C.',
    'Maison Margiela',
    'Acne Studios',
    'Y-3',
    'Comme des Garçons',
    'Needles',
    'Noah NYC',
    'Rhude',
    'Kith',
    'Fear of God',
    'John Elliott',
    'Club Monaco',
    'Outerknown',
    'Jil Sander',
    'The Row',
    'Issey Miyake',
    'Reiss',
    'Marni',
    'Opening Ceremony',
    'Sandro',
    'Maje',
    'Zadig & Voltaire',
    'Aritzia',
    'Anthropologie',
    'Cotton On',
    'Everlast',
  ];

  return (
    <>
      <section className="brand-list-section pt-125 pb-180">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="brand-list-header text-center mb-50">
                <h2 className="brand-list-title">Explore Your Favorite Clothing Brands</h2>
                <p>Browse our extensive list of top fashion brands from luxury designers to everyday essentials.</p>
              </div>
            </div>
          </div>

          <div className="row">
            {brands.map((brand, index) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6" key={index}>
                <Link href={`/brands/${brand.toLowerCase().replace(/ /g, '-')}`} className="brand-card">
                  <div className="brand-card-inner">
                    <h3 className="brand-name">{brand}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .brand-list-section {
          background-color: #f9f9f9;
        }

        .brand-list-header {
          margin-bottom: 40px;
        }

        .brand-list-title {
          font-size: 40px;
          font-weight: 700;
          color: #333;
        }

        .brand-list-header p {
          font-size: 18px;
          color: #666;
        }

        .brand-card {
          display: block;
          margin-bottom: 30px;
          border-radius: 8px;
          overflow: hidden;
          background-color: #ffffff;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
        }

        .brand-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 20px rgba(0, 0, 0, 0.15);
        }

        .brand-card-inner {
          padding: 30px 20px;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 600;
          color: #333;
        }

        @media (max-width: 768px) {
          .brand-name {
            font-size: 18px;
          }
        }

        @media (max-width: 576px) {
          .brand-name {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default BrandList;
