require('newrelic');
const express = require('express');

const Product = require('./db/db.js');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use('/products/:productId', express.static('public'));
app.use(express.static('public'));

let countProduct;
const getCount = async () => {
  countProduct = await Product.estimatedDocumentCount();
  //console.log(count);
};

app.get('/products/list', (req, res) => {
  const count = parseInt(req.query.count) || 5;
  const page = parseInt(req.query.page) || 1;

  getCount()
    .then(() => {
      const start = page === 1 ? 0 : (page * count - count);
      const stop = start + count < countProduct ? start + count : countProduct;
      const list = [];

      for (let i = start; i <= stop; i += 1) {
        list.push(i);
      }
      const startTime = Date.now();
      Product.find({
        id: { $in: list }
      },
        (err, docs) => {
          if (err) {
            console.log('err finding docs', err);
          }
          const products = [];
          docs.forEach((i) => {
            const respObj = {
              id: i.id,
              name: i.name,
              slogan: i.slogan,
              description: i.description,
              category: i.category,
              default_price: i.default_price,
            };
            products.push(respObj);
          });
          console.log(`Total elapsed query time: ${(Date.now() - startTime)}ms`);
          res.send(products);
        });
    });
});

app.get('/products/:product_id', (req, res) => {
  const id = req.params.product_id;
  getCount()
    .then(() => {
      if (id < 1 || id > countProduct) {
        res.status(404).send(`Invalid request`);
      } else {

        const startTime = Date.now();
        Product.find({ id }, (err, doc) => {
          if (err) {
            console.log('err getting product', err);
          }
          const resObj = {
            id: parseInt(id),
            name: doc[0].name,
            slogan: doc[0].slogan,
            description: doc[0].description,
            category: doc[0].category,
            default_price: doc[0].default_price,
            features: doc[0].features
          };
          console.log(`Total elapsed query time: ${(Date.now() - startTime)}ms`);
          res.send(resObj);
        });
      }
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  const id = req.params.product_id;
  getCount()
    .then(() => {
      if (id < 1 || id > countProduct) {
        res.status(404).send(`Invalid request`);
      } else {
        const startTime = Date.now();
        Product.find({ id }, (err, doc) => {
          if (err) {
            console.log('err');
          }
          const isShoe = doc[0].results[0].skus[7] !== undefined;
          let resObj;
          if (isShoe) {
            const newResults = doc[0].results.map(style => {
              for (let size in style.skus) {
                if (size.includes('_')) {
                  let newSize = size.replace('_', '.');
                  style.skus[newSize] = style.skus[size];
                  delete style.skus[size];
                }
              }
              return style;
            });
            resObj = {
              product_id: id,
              results: newResults
            };
          } else {
            resObj = {
              product_id: id,
              results: doc[0].results
            };
          }
          console.log(`Total elapsed query time: ${(Date.now() - startTime)}ms`);
          res.send(resObj);
        });
      }
    });
});

app.get('/products/:product_id/related', (req, res) => {
  const id = req.params.product_id;
  getCount()
    .then(() => {
      if (id < 1 || id > countProduct) {
        res.status(404).send('Invalid request');
      } else {
        const startTime = Date.now();
        Product.find({ id }, (err, doc) => {
          if (err) {
            console.log(`Err could not get product: ${err}`);
          }
          const resArr = doc[0].related;
          console.log(`Total elapsed query time: ${(Date.now() - startTime)}ms`);
          res.send(resArr);
        });
      }
    });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
