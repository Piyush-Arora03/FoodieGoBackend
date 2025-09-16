// import { prisma } from "../src/db";

// async function main() {
//   // Clear old data (optional in dev)
//   await prisma.menuItem.deleteMany();
//   await prisma.menuCategory.deleteMany();
//   await prisma.restaurant.deleteMany();

//   // Create restaurant with categories + menu items
//   await prisma.restaurant.create({
//     data: {
//       name: "Pizza Palace",
//       description: "Best pizzas in town 🍕",
//       street: "123 Main St",
//       city: "Ranchi",
//       state: "Uttarakhand",
//       postalCode: "834012",
//       latitude: 23.3871,
//       longitude: 85.3920,
//       cuisine: "Italian",
//       operatingHours: {
//         open: "10:00 AM",
//         close: "11:00 PM",
//       },
//       ownerId: "cmf9cjhyu0000k1ns0iniukm1",

//       // Nested relation: categories
//       menuCategories: {
//         create: [
//           {
//             name: "Pizzas",
//             items: {
//               create: [
//                 {
//                   name: "Margherita",
//                   description: "Classic pizza with tomato, mozzarella, and basil",
//                   price: 9.99,
//                   imageUrl: "https://example.com/margherita.jpg",
//                 },
//                 {
//                   name: "Pepperoni",
//                   description: "Tomato, mozzarella, and pepperoni",
//                   price: 11.99,
//                 },
//               ],
//             },
//           },
//           {
//             name: "Drinks",
//             items: {
//               create: [
//                 {
//                   name: "Coca Cola",
//                   description: "Refreshing soft drink",
//                   price: 1.99,
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     },
//     include: {
//       menuCategories: {
//         include: {
//           items: true,
//         },
//       },
//     },
//   });
//   await prisma.restaurant.createMany({
//   data: [
//     {
//       name: "Curry Corner",
//       description: "Authentic Indian curries 🍛",
//       street: "45 Market Road",
//       city: "Ranchi",
//       state: "Jharkhand",
//       postalCode: "834001",
//       latitude: 23.3700,
//       longitude: 85.3300,
//       cuisine: "Indian",
//       operatingHours: {
//         open: "11:00 AM",
//         close: "10:00 PM",
//       },
//       ownerId: "cmf9cjhyu0000k1ns0iniukm1",
//     },
//     {
//       name: "Sushi World",
//       description: "Fresh sushi and Japanese delights 🍣",
//       street: "88 Lake View",
//       city: "Ranchi",
//       state: "Jharkhand",
//       postalCode: "834005",
//       latitude: 23.3600,
//       longitude: 85.3400,
//       cuisine: "Japanese",
//       operatingHours: {
//         open: "12:00 PM",
//         close: "11:00 PM",
//       },
//       ownerId: "owner_125",
//     },
//     {
//       name: "Burger Hub",
//       description: "Juicy burgers and sides 🍔",
//       street: "10 College Road",
//       city: "Ranchi",
//       state: "Jharkhand",
//       postalCode: "834002",
//       latitude: 23.3650,
//       longitude: 85.3500,
//       cuisine: "American",
//       operatingHours: {
//         open: "10:30 AM",
//         close: "11:30 PM",
//       },
//       ownerId: "owner_126",
//     },
//     {
//       name: "Veggie Delight",
//       description: "Pure vegetarian meals 🥗",
//       street: "77 Station Road",
//       city: "Ranchi",
//       state: "Jharkhand",
//       postalCode: "834006",
//       latitude: 23.3750,
//       longitude: 85.3600,
//       cuisine: "Vegetarian",
//       operatingHours: {
//         open: "09:00 AM",
//         close: "10:00 PM",
//       },
//       ownerId: "owner_127",
//     },
//   ],
// });

// // With nested relations (categories + items)
// await prisma.restaurant.create({
//   data: {
//     name: "Curry Corner",
//     description: "Authentic Indian curries 🍛",
//     street: "45 Market Road",
//     city: "Ranchi",
//     state: "Jharkhand",
//     postalCode: "834001",
//     latitude: 23.3700,
//     longitude: 85.3300,
//     cuisine: "Indian",
//     operatingHours: { open: "11:00 AM", close: "10:00 PM" },
//     ownerId: "cmf9cjhyu0000k1ns0iniukm1",
//     menuCategories: {
//       create: [
//         {
//           name: "Curries",
//           items: {
//             create: [
//               { name: "Paneer Butter Masala", description: "Creamy curry", price: 8.99 },
//               { name: "Chicken Tikka Masala", description: "Spicy curry", price: 10.99 },
//             ],
//           },
//         },
//         {
//           name: "Breads",
//           items: {
//             create: [
//               { name: "Butter Naan", description: "Soft naan bread", price: 2.49 },
//               { name: "Garlic Naan", description: "Naan with garlic", price: 2.99 },
//             ],
//           },
//         },
//       ],
//     },
//   },
// });

// await prisma.restaurant.create({
//   data: {
//     name: "Sushi World",
//     description: "Fresh sushi and Japanese delights 🍣",
//     street: "88 Lake View",
//     city: "Ranchi",
//     state: "Jharkhand",
//     postalCode: "834005",
//     latitude: 23.3600,
//     longitude: 85.3400,
//     cuisine: "Japanese",
//     operatingHours: { open: "12:00 PM", close: "11:00 PM" },
//     ownerId: "cmf3xagc30000k1t8ug8x2qez",
//     menuCategories: {
//       create: [
//         {
//           name: "Sushi Rolls",
//           items: {
//             create: [
//               { name: "California Roll", description: "Crab & avocado", price: 12.99 },
//               { name: "Spicy Tuna Roll", description: "Tuna & chili", price: 13.99 },
//             ],
//           },
//         },
//         {
//           name: "Soups",
//           items: {
//             create: [
//               { name: "Miso Soup", description: "Classic Japanese soup", price: 4.99 },
//               { name: "Seafood Soup", description: "Mixed seafood broth", price: 6.99 },
//             ],
//           },
//         },
//       ],
//     },
//   },
// });

// await prisma.restaurant.create({
//   data: {
//     name: "Burger Hub",
//     description: "Juicy burgers and sides 🍔",
//     street: "10 College Road",
//     city: "Ranchi",
//     state: "Jharkhand",
//     postalCode: "834002",
//     latitude: 23.3650,
//     longitude: 85.3500,
//     cuisine: "American",
//     operatingHours: { open: "10:30 AM", close: "11:30 PM" },
//     ownerId: "cmf3xagc30000k1t8ug8x2qez",
//     menuCategories: {
//       create: [
//         {
//           name: "Burgers",
//           items: {
//             create: [
//               { name: "Cheeseburger", description: "Classic beef & cheese", price: 7.99 },
//               { name: "Veggie Burger", description: "Grilled veggie patty", price: 6.99 },
//             ],
//           },
//         },
//         {
//           name: "Sides",
//           items: {
//             create: [
//               { name: "French Fries", description: "Crispy fries", price: 2.99 },
//               { name: "Onion Rings", description: "Golden fried rings", price: 3.49 },
//             ],
//           },
//         },
//       ],
//     },
//   },
// });

// await prisma.restaurant.create({
//   data: {
//     name: "Veggie Delight",
//     description: "Pure vegetarian meals 🥗",
//     street: "77 Station Road",
//     city: "Ranchi",
//     state: "Jharkhand",
//     postalCode: "834006",
//     latitude: 23.3750,
//     longitude: 85.3600,
//     cuisine: "Vegetarian",
//     operatingHours: { open: "09:00 AM", close: "10:00 PM" },
//     ownerId: "cmf3xagc30000k1t8ug8x2qez",
//     menuCategories: {
//       create: [
//         {
//           name: "Salads",
//           items: {
//             create: [
//               { name: "Greek Salad", description: "Feta & olives", price: 5.99 },
//               { name: "Caesar Salad", description: "Classic Caesar", price: 6.49 },
//             ],
//           },
//         },
//         {
//           name: "Main Course",
//           items: {
//             create: [
//               { name: "Veg Biryani", description: "Aromatic rice & veggies", price: 8.49 },
//               { name: "Dal Tadka", description: "Yellow lentils with tadka", price: 7.49 },
//             ],
//           },
//         },
//       ],
//     },
//   },
// });


// //   console.log("✅ Seeded restaurant with menu:", JSON.stringify(restaurant, null, 2));
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error("❌ Error seeding:", e);
//     await prisma.$disconnect();
//     // process.exit(1);
//   });
