import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🖼 Updating restaurant & menu images...");

  const restaurantImages = [
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038799/restaurant1_fmgqet.jpg",
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038817/restaurant2_gfmkiy.jpg",
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038820/restaurant3_y15jfx.jpg",
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038786/restaurant4_ee1gpt.jpg",
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038817/restaurant5_dgumnh.jpg",
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038834/restaurant6_fyby9o.jpg",
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038864/restaurant7_nnmxfy.jpg",
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038844/restaurant8_t0aylg.jpg",
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038821/restaurant9_idnzoa.jpg",
    "https://res.cloudinary.com/dhinwujly/image/upload/v1763038832/restaurant10_jde6f0.jpg"
  ];

  const restaurants = await prisma.restaurant.findMany();

  for (let i = 0; i < restaurants.length; i++) {
    await prisma.restaurant.update({
      where: { id: restaurants[i].id },
      data: { image: restaurantImages[i % restaurantImages.length] },
    });
  }

    // TODO: Here we will cloudinary links later after uploading in the cloudinary
  const menuImages = [
    "https://res.cloudinary.com/demo/image/upload/v1/food/margherita_pizza.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/pepperoni_pizza.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/veg_pizza.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/pasta.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/lasagna.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/cheese_burger.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/chicken_burger.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/fries.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/wrap.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/grilled_sandwich.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/noodles.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/fried_rice.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/manchurian.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/dimsum.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/salad1.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/grilled_chicken_salad.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/buddha_bowl.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/chocolate_cake.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/milkshake.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1/food/icecream.jpg"
  ];

  const items = await prisma.menuItem.findMany();

  for (let i = 0; i < items.length; i++) {
    await prisma.menuItem.update({
      where: { id: items[i].id },
      data: { image: menuImages[i % menuImages.length] },
    });
  }

  console.log("🎉 Images updated successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
