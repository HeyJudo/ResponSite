// Sample resource management data for the table
export const CATEGORY_OPTIONS = ['Shelter Supplies', 'Clothing', 'Food', 'Equipment', 'Medicine'];
export const UNIT_OPTIONS = ['Packs', 'Boxes', 'Pieces', 'Gallons'];
export const LOCATION_OPTIONS = ['Evacuation Center', 'Baranggay Hall', 'Warehouse'];

export const resourceSampleData = [
  {
    id: 1,
    name: 'Blankets',
    category: 'Shelter Supplies',
    quantity: 150,
    unit: 'Pieces',
    location: 'Evacuation Center',
    reorderLevel: 50,
    note: 'Emergency blankets'
  },
  {
    id: 2,
    name: 'Medical Kits',
    category: 'Medicine',
    quantity: 45,
    unit: 'Boxes',
    location: 'Warehouse',
    reorderLevel: 20,
    note: 'First aid supplies'
  },
  {
    id: 3,
    name: 'Rice Bags',
    category: 'Food',
    quantity: 200,
    unit: 'Packs',
    location: 'Baranggay Hall',
    reorderLevel: 100,
    note: 'Staple food items'
  },
  {
    id: 4,
    name: 'Winter Coats',
    category: 'Clothing',
    quantity: 80,
    unit: 'Pieces',
    location: 'Evacuation Center',
    reorderLevel: 30,
    note: 'Heavy coats'
  },
  {
    id: 5,
    name: 'Water Containers',
    category: 'Equipment',
    quantity: 60,
    unit: 'Pieces',
    location: 'Warehouse',
    reorderLevel: 25,
    note: 'Storage containers'
  }
];

// Function to calculate status based on quantity and reorder level
export const calculateStatus = (quantity, reorderLevel) => {
  const qty = parseInt(quantity) || 0;
  const level = parseInt(reorderLevel) || 0;
  
  if (qty === 0) return 'Depleted';
  if (qty <= level) return 'Low Stock';
  return 'Available';
};
