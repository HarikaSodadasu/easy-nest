// Sample grocery data used across the site.
// Prices are illustrative demo prices in Indian Rupees (₹) — not real offers.

import apples from '../assets/images/p-apples.jpg';
import bananas from '../assets/images/p-bananas.jpg';
import avocado from '../assets/images/p-avocado.jpg';
import tomatoes from '../assets/images/p-tomatoes.jpg';
import carrots from '../assets/images/p-carrots.jpg';
import potatoes from '../assets/images/p-potatoes.jpg';
import milk from '../assets/images/p-milk.jpg';
import cheese from '../assets/images/p-cheese.jpg';
import yogurt from '../assets/images/p-yogurt.jpg';
import chocolates from '../assets/images/p-chocolates.jpg';
import orangeJuice from '../assets/images/p-orange-juice.jpg';
import nuts from '../assets/images/p-nuts.jpg';
import cleanerSpray from '../assets/images/p-cleaner-spray.jpg';
import gloves from '../assets/images/p-gloves.jpg';
import soap from '../assets/images/p-soap.jpg';
import bread from '../assets/images/p-bread.jpg';
import eggs from '../assets/images/p-eggs.jpg';
import rice from '../assets/images/p-rice.jpg';

// The "All" option is added by the Groceries component itself.
export const groceryCategories = [
  'Fresh Fruits',
  'Vegetables',
  'Dairy Products',
  'Snacks & Beverages',
  'Household Cleaning',
  'Daily Essentials',
];

export const products = [
  { id: 'p1', name: 'Red Apples', category: 'Fresh Fruits', unit: '1 kg', price: 180, image: apples },
  { id: 'p2', name: 'Ripe Bananas', category: 'Fresh Fruits', unit: '1 dozen', price: 60, image: bananas },
  { id: 'p3', name: 'Hass Avocado', category: 'Fresh Fruits', unit: '2 pcs', price: 220, image: avocado },
  { id: 'p4', name: 'Vine Tomatoes', category: 'Vegetables', unit: '500 g', price: 40, image: tomatoes },
  { id: 'p5', name: 'Fresh Carrots', category: 'Vegetables', unit: '500 g', price: 35, image: carrots },
  { id: 'p6', name: 'Potatoes', category: 'Vegetables', unit: '1 kg', price: 45, image: potatoes },
  { id: 'p7', name: 'Full Cream Milk', category: 'Dairy Products', unit: '1 L', price: 68, image: milk },
  { id: 'p8', name: 'Aged Cheese', category: 'Dairy Products', unit: '200 g', price: 240, image: cheese },
  { id: 'p9', name: 'Strawberry Yogurt', category: 'Dairy Products', unit: '4 cups', price: 120, image: yogurt },
  { id: 'p10', name: 'Assorted Chocolates', category: 'Snacks & Beverages', unit: '250 g', price: 299, image: chocolates },
  { id: 'p11', name: 'Orange Juice', category: 'Snacks & Beverages', unit: '1 L', price: 140, image: orangeJuice },
  { id: 'p12', name: 'Mixed Dry Fruits', category: 'Snacks & Beverages', unit: '500 g', price: 450, image: nuts },
  { id: 'p13', name: 'Surface Cleaner Spray', category: 'Household Cleaning', unit: '500 ml', price: 160, image: cleanerSpray },
  { id: 'p14', name: 'Reusable Cleaning Gloves', category: 'Household Cleaning', unit: '1 pair', price: 99, image: gloves },
  { id: 'p15', name: 'Natural Bath Soap', category: 'Daily Essentials', unit: '3 bars', price: 150, image: soap },
  { id: 'p16', name: 'Whole Wheat Bread', category: 'Daily Essentials', unit: '400 g', price: 55, image: bread },
  { id: 'p17', name: 'Farm Fresh Eggs', category: 'Daily Essentials', unit: '12 pcs', price: 90, image: eggs },
  { id: 'p18', name: 'Basmati Rice', category: 'Daily Essentials', unit: '1 kg', price: 130, image: rice },
];
