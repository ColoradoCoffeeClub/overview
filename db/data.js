/* eslint-disable indent */
// file that will generate data and place in another file in this folder
const fs = require('fs');
const faker = require('faker');

const RECORDS = 100;
const file = 'products.json';

let STYLE_ID = 1;

const createFeatures = () => {
  const MAX = 3;
  const MIN = 1;
  const numOfFeatures = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  let fakeFeatures = '';
  for (let i = 0; i < numOfFeatures; i += 1) {
    const feature = faker.commerce.productMaterial();
    const value = faker.commerce.productAdjective();
    fakeFeatures
      += `{
             "feature": "${feature}",
             "value": "${value}"
            }`;
    fakeFeatures += (i === numOfFeatures - 1) ? '' : ',';
  }
  return fakeFeatures;
};

const createPhotos = () => {
  const MAX = 4;
  const MIN = 1;
  const numOfPhotos = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  let fakePhotos = '';
  for (let i = 0; i < numOfPhotos; i += 1) {
    const thumbnail = faker.image.imageUrl(300, 400);
    const url = faker.image.imageUrl(650, 800);
    fakePhotos
      += `{
            "thumbnail_url": "${thumbnail}",
            "url": "${url}"
          }`;
    fakePhotos += (i === numOfPhotos - 1) ? '' : ',';
  }
  return fakePhotos;
};

const createSkus = (skuType) => {
  const getRandInt = () => {
    const MAX = 20;
    const MIN = 0;
    return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  };
  // const pickRandIndex = Math.floor(Math.random() * 3);
  let sku = '';
  if (skuType === 0) {
    sku = `{
            "One Size": ${getRandInt()}
           }`;
  } else if (skuType === 1 || skuType === 2) {
    sku = `{
           "XS": ${getRandInt()},
           "S": ${getRandInt()},
           "M": ${getRandInt()},
           "L": ${getRandInt()},
           "XL": ${getRandInt()},
           "XXL": ${getRandInt()}
          }`;
  } else {
    sku = `{
           "7": ${getRandInt()},
           "7_5": ${getRandInt()},
           "8": ${getRandInt()},
           "8_5": ${getRandInt()},
           "9": ${getRandInt()},
           "9_5": ${getRandInt()},
           "10": ${getRandInt()},
           "10_5": ${getRandInt()},
           "11": ${getRandInt()},
           "11_5": ${getRandInt()},
           "12": ${getRandInt()}
           }`;
  }
  return sku;
};

const createStyle = (defaultPrice) => {
  const MAX = 3;
  const MIN = 1;
  const numOfStyles = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  const randomSku = Math.floor(Math.random() * 5);
  let results = '';
  for (let i = 0; i < numOfStyles; i += 1) {
    const styleName = faker.commerce.color();
    // const stylePrice = faker.commerce.price();
    const styleSalePrice = (i % 4 === 0) ? Math.floor(faker.commerce.price() % 10) : 0;
    const styleDefault = i === 0 ? 1 : 0;
    const stylePhotos = createPhotos();
    const styleSkus = createSkus(randomSku);
    results
      += `{
            "style_id": ${STYLE_ID},
            "name": "${styleName}",
            "original_price": "${defaultPrice}",
            "sale_price": "${styleSalePrice}",
            "default?": ${styleDefault},
            "photos": [
              ${stylePhotos}
            ],
            "skus": ${styleSkus}
          }`;
    results += (i === numOfStyles - 1) ? '' : ',';
    STYLE_ID += 1;
  }
  return results;
};

const createProduct = (id, fakeName, fakeSlogan,
  fakeDescription, fakeCategory, fakePrice, fakeFeatures, fakeResults, fakeRelated) => {
  const newProduct = `{
    "id": ${id + 1},
    "name": "${fakeName}",
    "slogan": "${fakeSlogan}",
    "description": "${fakeDescription}",
    "category": "${fakeCategory}",
    "default_price": "${fakePrice}",
    "features": [
      ${fakeFeatures}
    ],
    "results": [
      ${fakeResults}
    ],
    "related": [${fakeRelated}]
  }`;

  if (id === 0) {
    fs.appendFileSync(file, `[${newProduct},`);
  } else if (id === RECORDS - 1) {
    fs.appendFileSync(file, `${newProduct}]`);
  } else {
    fs.appendFileSync(file, `${newProduct},`);
  }
};

const getRelated = (numOfRecords) => {
  const MAX = 6;
  const MIN = 2;
  const arr = [];
  const numRelatedItems = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
  for (let i = 0; i < numRelatedItems; i += 1) {
    const rand = Math.floor(Math.random() * (numOfRecords) + 1);
    if (arr.indexOf(rand) === -1) {
      arr.push(rand);
    } else {
      i -= 1;
    }
  }
  return arr;
};

const generateData = (records) => {
  const tenth = RECORDS / 10;
  let bars = '..........';
  let loadBar;
  const start = Date.now();
  for (let i = 0; i < records; i += 1) {
    const name = faker.commerce.productName();
    const slogan = faker.company.catchPhrase();
    const description = faker.commerce.productDescription();
    const category = faker.commerce.department();
    const defaultPrice = Math.floor(faker.commerce.price());
    const features = createFeatures();
    const results = createStyle(defaultPrice);
    const related = getRelated(RECORDS);
    createProduct(i, name, slogan, description, category, defaultPrice, features, results, related);
    if (i % tenth === 0) {
      const fraction = i / tenth;
      let loadedBars = '';
      for (let j = 0; j < fraction; j += 1) {
        loadedBars += '=';
      }
      const arr = bars.split('');
      arr.splice(0, fraction, loadedBars);
      bars = arr.join('');
      loadBar = `[${bars}]`;
      process.stdout.write(`\n${loadBar} ${(i / RECORDS) * 100}%`);
    }
  }
  const end = Date.now();
  process.stdout.write('\n[==========] 100%');
  console.log(`\nTotal elapsed time: ${(end - start) / 1000}s`);
};

generateData(RECORDS);
