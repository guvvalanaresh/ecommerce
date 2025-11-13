import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // -----------------------------
  // Users
  // -----------------------------
  const user1 = await prisma.user.upsert({
    where: { phone: "+919000000001" },
    update: {},
    create: {
      name: "Test User",
      phone: "+919000000001",
      email: "testuser@example.com",
      walletBalance: 250,
    },
  });

  // -----------------------------
  // Restaurants
  // -----------------------------
  const restaurants = await prisma.restaurant.createMany({
    data: [
      { name: "Burger Hub", address: "Hitech City", cuisines: ["American"], rating: 4.3, minOrder: 150 },
      { name: "Spicy Indian Meals", address: "Madhapur", cuisines: ["Indian"], rating: 4.5, minOrder: 100 },
      { name: "Italian Delight", address: "Kukatpally", cuisines: ["Italian"], rating: 4.2, minOrder: 120 },
      { name: "Asian Wok", address: "Banjara Hills", cuisines: ["Chinese"], rating: 4.4, minOrder: 130 },
      { name: "Healthy Bowl", address: "Gachibowli", cuisines: ["Healthy"], rating: 4.1, minOrder: 90 },
      { name: "Pizza Palace", address: "Miyapur", cuisines: ["Italian", "Fast Food"], rating: 4.3, minOrder: 140 },
      { name: "Chicken Center", address: "Dilsukhnagar", cuisines: ["Grill", "Indian"], rating: 4.0, minOrder: 110 },
      { name: "Tasty Shawarma", address: "Ameerpet", cuisines: ["Arabian"], rating: 4.6, minOrder: 100 },
    ],
  });

  const allRestaurants = await prisma.restaurant.findMany();

  // -----------------------------
  // Menu Items
  // -----------------------------
  const menuItemsData = [];

  const sampleItems = [
    { name: "Classic Burger", price: 150, veg: false },
    { name: "Veg Burger", price: 120, veg: true },
    { name: "Chicken Biryani", price: 180, veg: false },
    { name: "Paneer Biryani", price: 160, veg: true },
    { name: "Margherita Pizza", price: 250, veg: true },
    { name: "Pepperoni Pizza", price: 320, veg: false },
    { name: "Chicken Shawarma", price: 90, veg: false },
    { name: "Veg Shawarma", price: 80, veg: true },
    { name: "Pasta Alfredo", price: 220, veg: true },
    { name: "Pasta Arrabiata", price: 200, veg: true },
  ];

  for (let r of allRestaurants) {
    for (let i = 0; i < 5; i++) {
      const item = sampleItems[(Math.random() * sampleItems.length) | 0];
      menuItemsData.push({
        restaurantId: r.id,
        name: item.name,
        price: item.price,
        veg: item.veg,
        description: `${item.name} freshly prepared.`,
      });
    }
  }

  await prisma.menuItem.createMany({ data: menuItemsData });

  // -----------------------------
  // Coupons
  // -----------------------------
  await prisma.coupon.createMany({
    data: [
      { code: "WELCOME50", discount: 50, minOrder: 200 },
      { code: "SAVE100", discount: 100, minOrder: 400 },
      { code: "FOODIE20", discount: 20, minOrder: 150 },
      { code: "EXTRA10", discount: 10, minOrder: 100 },
    ],
  });

  // -----------------------------
  // Reviews
  // -----------------------------
  const sampleReviews = [
    "Amazing food!",
    "Really tasty and fresh.",
    "Could be better.",
    "Loved it!",
    "Will order again!",
  ];

  for (let r of allRestaurants) {
    for (let i = 0; i < 3; i++) {
      await prisma.review.create({
        data: {
          userId: user1.id,
          restaurantId: r.id,
          rating: 3 + (Math.random() * 2) | 0,
          comment: sampleReviews[(Math.random() * sampleReviews.length) | 0],
        },
      });
    }
  }

  console.log("🌱 Database seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
