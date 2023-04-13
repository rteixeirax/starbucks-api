import { prismaClient } from './prismaClient';

function generateRandomPrice(min: number, max: number) {
  const random = Math.random() * (max - min) + min;
  return Math.round(random * 100) / 100;
}

async function seed() {
  const categoryNames = ['Espresso Drinks', 'Brewed Coffee', 'Tea'];
  const extraNames = ['Cinnamon', 'Yellow sugar', 'Syrup', 'Whipped Cream'];

  await prismaClient.category.createMany({
    data: categoryNames.map((categoryName) => ({
      name: categoryName,
    })),
  });

  await prismaClient.extra.createMany({
    data: extraNames.map((extraName) => ({
      name: extraName,
      price: generateRandomPrice(1, 2),
    })),
  });

  const categories = await prismaClient.category.findMany({
    where: {
      name: {
        in: categoryNames,
      },
    },
  });

  await prismaClient.product.createMany({
    data: [
      {
        categoryId: categories[0].categoryId,
        name: 'Latte',
        price: generateRandomPrice(5, 10),
        stock: 10,
      },
      {
        categoryId: categories[0].categoryId,
        name: 'Mocha',
        price: generateRandomPrice(5, 10),
        stock: 10,
      },
      {
        categoryId: categories[1].categoryId,
        name: 'Filter coffee',
        price: generateRandomPrice(5, 10),
        stock: 10,
      },
      {
        categoryId: categories[1].categoryId,
        name: 'Caffe Misto',
        price: generateRandomPrice(5, 10),
        stock: 10,
      },
      {
        categoryId: categories[2].categoryId,
        name: 'Mint',
        price: generateRandomPrice(5, 10),
        stock: 10,
      },
      {
        categoryId: categories[2].categoryId,
        name: 'Chamomile Herbal',
        price: generateRandomPrice(5, 10),
        stock: 10,
      },
    ],
  });
}

seed();
