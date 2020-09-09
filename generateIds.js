// file to generate a csv file filled with product ids, used in artillery test

const fs = require('fs');

const file = 'product_ids.csv';

const numberOfIds = 1000;

for (let i = 0; i < numberOfIds; i += 1) {
  const id = Math.floor(Math.random() * (10000000 - 0) + 1);
  fs.appendFileSync(file, `${id}\n`);
}
