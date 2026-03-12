import express, { Request, Response } from 'express';
import { recommendedProducts } from './dummyData';

const app = express();
const port = 3001;
const cors = require('cors');
let unfinishedFlag = false
app.use(cors());

app.use(express.json());

app.get("/get-product-recommendations", (_: Request, res: Response) => {
  const randomNumber = Math.random();

  if (randomNumber > 0.5) {
    const shuffledProducts = recommendedProducts
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    const randomProducts = shuffledProducts.slice(0, 5);
    return res.json(randomProducts);
  }

  return res.status(500).send('Internal Server Error');
});

app.get("/get-products-by-category", (req: Request, res: Response) => {
  const products = recommendedProducts.filter((product) => {
    if (product.productType == req.query.productType) return product;
  })

  return res.json(products);
});

app.get("/set-unfinished-flag", (req: Request, res: Response) => {
  let flag = req.query.flag;
  if (typeof flag == 'string') {
    unfinishedFlag = Boolean(flag);
  }

  return res.status(200).send(unfinishedFlag);
})

app.get("/unfinished-feature", (_: Request, res: Response) => {
  if (unfinishedFlag) {
    // Oh no, this feature is not ready for production!
    return res.status(501).send('Not Implemented');
  }
  else {
    return res.status(404).send('Not Found');
  }
});

app.get("/set-product-discount", (req: Request, res: Response) => {
  const title = req.query.productTitle;
  const discount = req.query.discount;
  console.log(req.query)
  if (!title || !discount) {
    return res.status(400).send('Wrong parameters');
  }

  const productIndex = recommendedProducts.findIndex((product) => product.title === title);
  if (productIndex != -1) {
    recommendedProducts[productIndex].discountRate = Number(discount);
    return res.status(200).send(recommendedProducts[productIndex]);
  }
  else {
    return res.status(400).send('No product found for the requested title');
  }

})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
