
const menu_data = [
  {
    id: 1,
    sub_menu: true,
    title: 'Men',
    link: '/men',
    sub_menus: [
      { 
        title: 'T-Shirts & Polos', 
        link: '/men/t-shirts-polos',
        sub_menus: [
          { title: 'Polos', link: '/men/t-shirts-polos/polos' },
          { title: 'T-Shirts', link: '/men/t-shirts-polos/t-shirts' },
          { title: 'Longsleeves', link: '/men/t-shirts-polos/longsleeves' }
        ]
      },
      { 
        title: 'Jeans', 
        link: '/men/jeans', 
        sub_menus: []
      },
      { 
        title: 'Blazers', 
        link: '/men/blazers',
        sub_menus: [
          { title: 'Colberts', link: '/men/blazers/colberts' },
          { title: 'Blazers', link: '/men/blazers/blazers' }
        ]
      },
      { 
        title: 'Accessories', 
        link: '/men/accessories',
        sub_menus: [
          { title: 'Scarves', link: '/men/accessories/scarves' },
          { title: 'Ties', link: '/men/accessories/ties' },
          { title: 'Gloves', link: '/men/accessories/gloves' },
          { title: 'Hats', link: '/men/accessories/hats' },
          { title: 'Suspenders', link: '/men/accessories/suspenders' },
          { title: 'Pocket Squares', link: '/men/accessories/pocket-squares' }
        ]
      },
      { 
        title: 'Shirts', 
        link: '/men/shirts',
        sub_menus: [
          { title: 'Long Sleeve', link: '/men/shirts/long-sleeve' },
          { title: 'Short Sleeve', link: '/men/shirts/short-sleeve' }
        ]
      },
      { 
        title: 'Pants', 
        link: '/men/pants',
        sub_menus: [
          { title: 'Trousers', link: '/men/pants/trousers' },
          { title: 'Shorts', link: '/men/pants/shorts' },
          { title: 'Bermuda', link: '/men/pants/bermuda' },
          { title: 'Joggers', link: '/men/pants/joggers' },
          { title: 'Chino', link: '/men/pants/chino' },
          { title: 'Cargo', link: '/men/pants/cargo' }
        ]
      },
      { title: 'Suits', link: '/men/suits', sub_menus: [] },
      { 
        title: 'Headwear', 
        link: '/men/headwear',
        sub_menus: [
          { title: 'Caps', link: '/men/headwear/caps' },
          { title: 'Hats', link: '/men/headwear/hats' }
        ]
      },      
      { 
        title: 'Sweaters', 
        link: '/men/sweaters',
        sub_menus: [
          { title: 'Sweaters', link: '/men/sweaters/sweaters' },
          { title: 'Hoodies', link: '/men/sweaters/hoodies' },
          { title: 'Pullovers', link: '/men/sweaters/pullovers' },
          { title: 'Turtleneck', link: '/men/sweaters/turtleneck' }
        ]
      },    
      { 
        title: 'Coats & Jackets', 
        link: '/men/coats-jackets',
        sub_menus: [
          { title: 'Body Warmers', link: '/men/coats-jackets/body-warmers' },
          { title: 'Padded Jackets', link: '/men/coats-jackets/padded-jackets' },
          { title: 'Jackets', link: '/men/coats-jackets/jackets' },
          { title: 'Leather Jackets', link: '/men/coats-jackets/leather-jackets' },
          { title: 'Bomber Jackets', link: '/men/coats-jackets/bomber-jackets' },
          { title: 'Windbreakers', link: '/men/coats-jackets/windbreakers' },
          { title: 'Puffer Jackets', link: '/men/coats-jackets/puffer-jackets' },
          { title: 'Parka', link: '/men/coats-jackets/parka' },
          { title: 'Coats', link: '/men/coats-jackets/coats' },
          { title: 'Trench Coats', link: '/men/coats-jackets/trench-coats' }
        ]
      },  
      { title: 'Belts', link: '/men/belts', sub_menus: [] },
      { 
        title: 'Socks & Underwear', 
        link: '/men/socks-underwear',
        sub_menus: [
          { title: 'Socks', link: '/men/socks-underwear/socks' },
          { title: 'Underwear', link: '/men/socks-underwear/underwear' }
        ]
      },    
      { 
        title: 'Cardigans & Vests', 
        link: '/men/cardigans-vests',
        sub_menus: [
          { title: 'Cardigans', link: '/men/cardigans-vests/cardigans' },
          { title: 'Overshirts', link: '/men/cardigans-vests/overshirts' },
          { title: 'Vests', link: '/men/cardigans-vests/vests' }
        ]
      }, 
      { 
        title: 'Shoes', 
        link: '/men/shoes',
        sub_menus: [
          { title: 'Sneakers', link: '/men/shoes/sneakers' },
          { title: 'Lace-up Shoes', link: '/men/shoes/lace-up-shoes' },
          { title: 'Loafers', link: '/men/shoes/loafers' },
          { title: 'Boots', link: '/men/shoes/boots' },
          { title: 'Monk Shoes', link: '/men/shoes/monk-shoes' },
          { title: 'Slippers & Sandals', link: '/men/shoes/slippers-sandals' }
        ]
      },  
      { title: 'Bags', link: '/men/bags', sub_menus: [] },
      { title: 'Swimwear', link: '/men/swimwear', sub_menus: [] },
      { title: 'Gadgets', link: '/men/gadgets', sub_menus: [] }
    ]
  },
  {
    id: 2,
    sub_menu: true,
    title: 'Women',
    link: '/women',
sub_menus: [
  { 
    title: 'T-Shirts & Polos', 
    link: '/women/t-shirts-polos',
    sub_menus: [
      { title: 'Tops', link: '/women/t-shirts-polos/tops' },
      { title: 'T-Shirts', link: '/women/t-shirts-polos/t-shirts' },
      { title: 'Polos', link: '/women/t-shirts-polos/polos' },
      { title: 'Bodys', link: '/women/t-shirts-polos/bodys' },
      { title: 'Long Sleeves', link: '/women/t-shirts-polos/long-sleeves' },
      { title: 'Singlets', link: '/women/t-shirts-polos/singlets' },
    ]
  },
  { 
    title: 'Jeans', 
    link: '/women/jeans', 
    sub_menus: [
      { title: 'Jeans', link: '/women/jeans/jeans' },
      { title: 'Flared Jeans', link: '/women/jeans/flared-jeans' },
      { title: 'Straight Leg', link: '/women/jeans/straight-leg' },
      { title: 'Skinny Jeans', link: '/women/jeans/skinny-jeans' },
      { title: 'Slim Fit', link: '/women/jeans/slim-fit' },
    ]
  },
  { 
    title: 'Coats & Jackets', 
    link: '/women/coats-jackets',
    sub_menus: [
      { title: 'Padded', link: '/women/coats-jackets/padded' },
      { title: 'Jackets', link: '/women/coats-jackets/jackets' },
      { title: 'Bodywarmers', link: '/women/coats-jackets/bodywarmers' },
      { title: 'Denim Jackets', link: '/women/coats-jackets/denim-jackets' },
      { title: 'Coats', link: '/women/coats-jackets/coats' },
      { title: 'Trench Coats', link: '/women/coats-jackets/trench-coats' },
      { title: 'Parka', link: '/women/coats-jackets/parka' },
      { title: 'Bomber Jackets', link: '/women/coats-jackets/bomber-jackets' },
      { title: 'Teddy Jackets', link: '/women/coats-jackets/teddy-jackets' },
      { title: 'Ski Jackets', link: '/women/coats-jackets/ski-jackets' },
      { title: 'Raincoats', link: '/women/coats-jackets/raincoats' },
      { title: 'Leather Jackets', link: '/women/coats-jackets/leather-jackets' },
    ]
  },
  { 
    title: 'Blouses', 
    link: '/women/blouses',
    sub_menus: [
      { title: 'Blouses', link: '/women/blouses/blouses' },
      { title: 'Tunics', link: '/women/blouses/tunics' },
    ]
  },
  { 
    title: 'Pants', 
    link: '/women/pants',
    sub_menus: [
      { title: 'Trousers', link: '/women/pants/trousers' },
      { title: 'Leggings', link: '/women/pants/leggings' },
      { title: 'Shorts', link: '/women/pants/shorts' },
      { title: 'Bermuda', link: '/women/pants/bermuda' },
      { title: 'Leather Pants', link: '/women/pants/leather-pants' },
      { title: 'Ski Pants', link: '/women/pants/ski-pants' },
      { title: 'Joggers', link: '/women/pants/joggers' },
      { title: 'Cargo Pants', link: '/women/pants/cargo-pants' },
    ]
  },
  { 
    title: 'Headwear', 
    link: '/women/headwear',
    sub_menus: [
      { title: 'Beanies', link: '/women/headwear/beanies' },
      { title: 'Caps', link: '/women/headwear/caps' },
      { title: 'Hats', link: '/women/headwear/hats' },
      { title: 'Headbands', link: '/women/headwear/headbands' },
    ]
  },
  { title: 'Swimwear', link: '/women/swimwear', sub_menus: [] },
  { 
    title: 'Sweaters', 
    link: '/women/sweaters',
    sub_menus: [
      { title: 'Sweaters', link: '/women/sweaters/sweaters' },
      { title: 'Pullovers', link: '/women/sweaters/pullovers' },
      { title: 'Turtlenecks', link: '/women/sweaters/turtlenecks' },
      { title: 'Hoodies', link: '/women/sweaters/hoodies' },
      { title: 'Sweatshirts', link: '/women/sweaters/sweatshirts' },
      { title: 'Spencers', link: '/women/sweaters/spencers' },
    ]
  },
  { title: 'Skirts', link: '/women/skirts', sub_menus: [] },
  { 
    title: 'Bags', 
    link: '/women/bags',
    sub_menus: [
      { title: 'Shoulder Bags', link: '/women/bags/shoulder-bags' },
      { title: 'Handbags', link: '/women/bags/handbags' },
      { title: 'Shoppers', link: '/women/bags/shoppers' },
      { title: 'Waist Bags', link: '/women/bags/waist-bags' },
      { title: 'Crossbody Bags', link: '/women/bags/crossbody-bags' },
    ]
  },
  { title: 'Shoes', link: '/women/shoes', sub_menus: [
    { title: 'Sneakers', link: '/women/shoes/sneakers' },
    { title: 'Boots', link: '/women/shoes/boots' },
    { title: 'Loafers', link: '/women/shoes/loafers' },
    { title: 'Sandals & Slippers', link: '/women/shoes/sandals-slippers' },
    { title: 'Heels', link: '/women/shoes/heels' }
  ]
}
]
},
{
  id: 3,
  sub_menu: true,
  title: 'Kids',
  link: '/kids',
  sub_menus: [
    { title: 'T-Shirts & Polos', link: '/kids/t-shirts-polos', sub_menus: [] },
    { title: 'Jeans', link: '/kids/jeans', sub_menus: [] },
    { title: 'Blazers', link: '/kids/blazers', sub_menus: [] },
    { title: 'Accessories', link: '/kids/accessories', sub_menus: [] },
    { title: 'Sweaters', link: '/kids/sweaters', sub_menus: [] },
  ]
},
{
  id: 4,
  title: 'New Arrivals',
  link: '/new-arrivals',
  sub_menu: true,
  sub_menus: [
    { title: 'Men', link: '/new-arrivals/men' },
    { title: 'Women', link: '/new-arrivals/women' },
    { title: 'Kids', link: '/new-arrivals/kids' },
  ]
},
{
  id: 5,
  title: 'Sale',
  link: '/sale',
  sub_menu: true,
  sub_menus: [
    { title: 'Up to 50% Off', link: '/sale/up-to-50-off' },
    { title: 'Clearance', link: '/sale/clearance' },
    { title: 'Limited Time Offers', link: '/sale/limited-time-offers' },
  ]
},
{
  id: 6,
  title: 'Trending',
  link: '/trending',
  sub_menu: true,
  sub_menus: [
    { title: 'Top Picks', link: '/trending/top-picks' },
    { title: 'Best Sellers', link: '/trending/best-sellers' },
    { title: 'Staff Picks', link: '/trending/staff-picks' },
  ]
},
{
  id: 7,
  title: 'Deals',
  link: '/deals',
  sub_menus: [
    { title: 'Buy 1 Get 1 Free', link: '/deals/bogo' },
    { title: 'Flash Sales', link: '/deals/flash-sales' },
    { title: 'Limited Time Offers', link: '/deals/limited-time-offers' }
  ]
}
]

export default menu_data;

export const mobile_menu = [...menu_data];
