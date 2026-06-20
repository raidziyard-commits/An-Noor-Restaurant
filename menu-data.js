// Default menu data
const defaultMenuData = [
  {
    id: 'mandi-1',
    category: 'mandi',
    name: 'Whole Lamb Mandi',
    description: 'Slow-roasted whole lamb on fragrant saffron rice, garnished with fried onions, raisins & fresh herbs. A feast for the whole family.',
    price: 'Rs 6,500 / whole',
    image: 'images/mandi_rice_hero.png',
    badge: 'Chef\'s Special'
  },
  {
    id: 'mandi-2',
    category: 'mandi',
    name: 'Chicken Mandi',
    description: 'Tender whole chicken marinated with Arabic spices, slow-cooked in a traditional tandoor oven and served on aromatic basmati rice.',
    price: 'Rs 1,800 / person',
    image: 'images/mandi_rice_hero.png',
    badge: ''
  },
  {
    id: 'mandi-3',
    category: 'mandi',
    name: 'Beef Mandi',
    description: 'Succulent beef slow-roasted with our secret blend of Arabic spices, served on golden saffron basmati rice. Irresistibly tender.',
    price: 'Rs 2,000 / person',
    image: 'images/mandi_rice_hero.png',
    badge: 'Popular'
  },
  {
    id: 'biryani-1',
    category: 'biryani',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken, fried onions, saffron & mint. Served with raita and salad.',
    price: 'Rs 1,200 / plate',
    image: 'images/biryani_dish.png',
    badge: 'Most Loved'
  },
  {
    id: 'biryani-2',
    category: 'biryani',
    name: 'Mutton Biryani',
    description: 'Tender mutton pieces slow-cooked with caramelized onions and whole spices, layered over premium basmati rice.',
    price: 'Rs 1,500 / plate',
    image: 'images/biryani_dish.png',
    badge: ''
  },
  {
    id: 'biryani-3',
    category: 'biryani',
    name: 'Prawn Biryani',
    description: 'Juicy prawns cooked in coastal spices, mixed into fragrant basmati rice. A seafood lover\'s delight from the Sri Lankan coast.',
    price: 'Rs 1,400 / plate',
    image: 'images/biryani_dish.png',
    badge: ''
  },
  {
    id: 'koththu-1',
    category: 'koththu',
    name: 'Beef Cheese Koththu',
    description: 'Our legendary recipe! Shredded roti with an abundance of tender beef pieces, melted cheese, eggs & vegetables. Sizzling hot!',
    price: 'Rs 1,100 / plate',
    image: 'images/koththu_dish.png',
    badge: 'Signature'
  },
  {
    id: 'koththu-2',
    category: 'koththu',
    name: 'Chicken Koththu',
    description: 'Classic Sri Lankan koththu with juicy chicken strips, mixed vegetables, spiced gravy and our special house seasoning.',
    price: 'Rs 950 / plate',
    image: 'images/koththu_dish.png',
    badge: ''
  },
  {
    id: 'koththu-3',
    category: 'koththu',
    name: 'Special Mixed Koththu',
    description: 'A combination of beef, chicken and egg koththu with extra cheese, premium spices and a rich house-made sauce.',
    price: 'Rs 1,300 / plate',
    image: 'images/koththu_dish.png',
    badge: ''
  },
  {
    id: 'sawan-1',
    category: 'sawan',
    name: 'Sawan for 10 Persons',
    description: 'Traditional floor dining spread with whole lamb mandi, salads, hummus, fresh bread, desserts & beverages for up to 10 guests.',
    price: 'Rs 18,000 / group',
    image: 'images/sawan_majlis.png',
    badge: 'Group Dining'
  },
  {
    id: 'sawan-2',
    category: 'sawan',
    name: 'Royal Majlis – 20 Persons',
    description: 'Grand Arabic Majlis experience with multiple whole meats, an array of side dishes, Arabic sweets and premium beverages.',
    price: 'Rs 35,000 / group',
    image: 'images/sawan_majlis.png',
    badge: ''
  },
  {
    id: 'sawan-3',
    category: 'sawan',
    name: 'Custom Event Package',
    description: 'Planning a celebration, corporate lunch or family reunion? Contact us for a fully tailored Sawan/Majlis package to suit your needs.',
    price: 'Custom Pricing',
    image: 'images/sawan_majlis.png',
    badge: ''
  },
  {
    id: 'beverages-1',
    category: 'beverages',
    name: 'Mango Lassi',
    description: 'Thick, creamy yogurt blended with fresh Alphonso mangoes, a pinch of cardamom & rose water. Chilled to perfection.',
    price: 'Rs 350 / glass',
    image: 'images/beverages.png',
    badge: 'Refreshing'
  },
  {
    id: 'beverages-2',
    category: 'beverages',
    name: 'Arabic Cardamom Tea',
    description: 'Authentic Arabic Qahwa made with green cardamom pods, saffron & rose water. Served in traditional Arabic cups.',
    price: 'Rs 200 / pot',
    image: 'images/beverages.png',
    badge: ''
  },
  {
    id: 'beverages-3',
    category: 'beverages',
    name: 'Fresh Lime & Mint Cooler',
    description: 'Freshly squeezed Sri Lankan lime, crushed mint leaves, a hint of ginger and soda. The perfect tropical refreshment.',
    price: 'Rs 250 / glass',
    image: 'images/beverages.png',
    badge: ''
  },
  {
    id: 'combo-1',
    category: 'combo',
    name: 'Family Mandi Combo (4 pax)',
    description: 'Chicken Mandi for 4 + 4 Soft Drinks + Salad + Raita + Fresh Bread. Perfect for a complete family dinner.',
    price: 'Rs 6,500 / combo',
    image: 'images/mandi_rice_hero.png',
    badge: 'Best Value'
  },
  {
    id: 'combo-2',
    category: 'combo',
    name: 'Biryani Feast Combo (6 pax)',
    description: '6 plates of Chicken Biryani + 6 Beverages + 2 Salads + Special Dessert. Ideal for a family celebration.',
    price: 'Rs 8,500 / combo',
    image: 'images/biryani_dish.png',
    badge: ''
  },
  {
    id: 'combo-3',
    category: 'combo',
    name: 'Koththu Party Pack',
    description: '4 Beef Cheese Koththu + 2 Chicken Koththu + 6 Fresh Lime Coolers. The ultimate takeaway package for a group.',
    price: 'Rs 7,200 / pack',
    image: 'images/koththu_dish.png',
    badge: ''
  }
];

// Initialize menu data in localStorage if it doesn't exist
if (!localStorage.getItem('restaurantMenuData')) {
  localStorage.setItem('restaurantMenuData', JSON.stringify(defaultMenuData));
}

// Function to get current menu data
function getMenuData() {
  const data = localStorage.getItem('restaurantMenuData');
  return data ? JSON.parse(data) : defaultMenuData;
}
