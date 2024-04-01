const faker=require('faker');

// Generate random data for MachhanProducts collection
const generateRandomData = (num) => {
    const data = [];
    const reviewSet=[
      'Excellent product!',
      'Great value for money.',
      'Highly recommended!',
      'Fantastic quality.',
      'Very satisfied with the purchase.',
      'Amazing experience!',
      'Superb product!',
      'Impressed with the performance.',
      'Top-notch quality.',
      'Outstanding product!',
      'Poor quality product.',
      'Not worth the price.',
      'Disappointed with the purchase.',
      'Below average performance.',
      'Would not recommend.',
      'Terrible experience.',
      'Not satisfied with the product.',
      'Low-quality materials.'
    ]
    for (let i = 1; i <= num; i++) {
      const description=`This is the description for product:${i} => ` + faker.lorem.paragraph();
      const item = {
        productID: i.toString(),
        productName: faker.commerce.productName(),
        brandName: faker.company.companyName(),
        price: faker.random.number({ min: 100, max: 10000 }),
        description: description,
        review: reviewSet[Math.floor(Math.random()*20)+1]
      };
      data.push(item);
    }
    return data;
  };
  
module.exports=generateRandomData;