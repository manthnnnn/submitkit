const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SaaS database...');

  // 0. Clear existing data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.restaurant.deleteMany({});

  // 1. Create a Restaurant (The Tenant)
  const rest1 = await prisma.restaurant.create({
    data: {
      name: 'The Spice Lounge',
      slug: 'spice-lounge',
    }
  });

  const rest2 = await prisma.restaurant.create({
    data: {
      name: 'Burger Boss',
      slug: 'burger-boss',
    }
  });

  // 2. Create Categories for Spice Lounge
  const catStarters = await prisma.category.create({ data: { name: 'Starters', order: 1, restaurantId: rest1.id } });
  const catMains = await prisma.category.create({ data: { name: 'Main Course', order: 2, restaurantId: rest1.id } });
  const catBreads = await prisma.category.create({ data: { name: 'Breads', order: 3, restaurantId: rest1.id } });
  const catDrinks = await prisma.category.create({ data: { name: 'Beverages', order: 4, restaurantId: rest1.id } });

  // 3. Create Menu Items for Spice Lounge
  const items = [
    { name: 'Paneer Tikka', description: 'Cottage cheese marinated in spices and grilled in a tandoor.', price: 250, isVeg: true, categoryId: catStarters.id, image: '/images/paneer_tikka.jpg' },
    { name: 'Chicken 65', description: 'Spicy, deep-fried chicken dish originating from Chennai.', price: 290, isVeg: false, categoryId: catStarters.id, image: '/images/butter_chicken.jpg' },
    { name: 'Butter Chicken', description: 'Classic Indian dish made with a mildly spiced tomato sauce.', price: 380, isVeg: false, categoryId: catMains.id, image: '/images/butter_chicken.jpg' },
    { name: 'Dal Makhani', description: 'Black lentils cooked with butter and cream.', price: 280, isVeg: true, categoryId: catMains.id, image: '/images/garlic_naan.jpg' },
    { name: 'Garlic Naan', description: 'Soft flatbread baked in tandoor, topped with garlic and butter.', price: 60, isVeg: true, categoryId: catBreads.id, image: '/images/garlic_naan.jpg' },
    { name: 'Tandoori Roti', description: 'Whole wheat flatbread baked in a tandoor.', price: 30, isVeg: true, categoryId: catBreads.id, image: '/images/garlic_naan.jpg' },
    { name: 'Mango Lassi', description: 'Refreshing yogurt-based mango drink.', price: 120, isVeg: true, categoryId: catDrinks.id, image: '/images/mango_lassi.jpg' },
    { name: 'Masala Chai', description: 'Indian tea brewed with milk and aromatic spices.', price: 40, isVeg: true, categoryId: catDrinks.id, image: '/images/mango_lassi.jpg' }
  ];

  for (const item of items) {
    await prisma.menuItem.create({ data: item });
  }

  // 4. Create some active orders for Spice Lounge KDS
  const bc = await prisma.menuItem.findFirst({ where: { name: 'Butter Chicken', category: { restaurantId: rest1.id } } });
  const gn = await prisma.menuItem.findFirst({ where: { name: 'Garlic Naan', category: { restaurantId: rest1.id } } });
  const pt = await prisma.menuItem.findFirst({ where: { name: 'Paneer Tikka', category: { restaurantId: rest1.id } } });
  
  if (bc && gn && pt) {
    await prisma.order.create({
      data: {
        tableNumber: '4',
        status: 'RECEIVED',
        totalAmount: bc.price + (gn.price * 2),
        restaurantId: rest1.id,
        items: {
          create: [
            { menuItemId: bc.id, quantity: 1, price: bc.price },
            { menuItemId: gn.id, quantity: 2, price: gn.price }
          ]
        }
      }
    });

    await prisma.order.create({
      data: {
        tableNumber: '7',
        status: 'PREPARING',
        totalAmount: pt.price * 2,
        restaurantId: rest1.id,
        items: {
          create: [
            { menuItemId: pt.id, quantity: 2, price: pt.price, notes: 'Make it spicy' }
          ]
        }
      }
    });
  }

  console.log('✅ SaaS Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
