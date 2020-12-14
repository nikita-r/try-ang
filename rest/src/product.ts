import { NextFunction, Request, Response, Router } from 'express';
import { getProductRepository, Person_EmailAddress, getDatabaseOutline } from './model';

export const router: Router = Router();

require('log-timestamp');

router.get('/product', async function (req: Request, res: Response, next: NextFunction) {
  console.log('GET /product');

  try {
    const repository = await getProductRepository();

    const allProducts = await repository.find();

    res.send(allProducts);
  } catch (err) {
    return next(err);
  }
});

router.get('/product/:id', async function (req: Request, res: Response, next: NextFunction) {
  console.log('GET /product/:id');

  try {
    const repository = await getProductRepository();

    const email = await repository.find({ EmailAddressID: req.params.id });

    res.send(email);
  } catch (err) {
    return next(err);
  }
});

router.post('/product', async function (req: Request, res: Response, next: NextFunction) {
  console.log('POST /product');

  try {
    const repository = await getProductRepository();

    const email = new Person_EmailAddress();
    email.BusinessEntityID = 94;
    email.EmailAddress = req.body.EmailAddress;

    const rez = await repository.save(email);
    res.send(rez);
  } catch (err) {
    return next(err);
  }
});

router.post('/product/:id', async function (req: Request, res: Response, next: NextFunction) {
  console.log('POST /product/:id');

  try {
    const repository = await getProductRepository();

    const email = await repository.findOne({ EmailAddressID: req.params.id });
    email.EmailAddress = req.body.EmailAddress;

    const rez = await repository.save(email);
    res.send(rez);
  } catch (err) {
    return next(err);
  }
});

router.delete('/product/:id', async function (req: Request, res: Response, next: NextFunction) {
  console.log('DELETE /product/:id');

  try {
    const repository = await getProductRepository();

    await repository.delete({ EmailAddressID: req.params.id });

    res.send('OK');
  } catch (err) {
    return next(err);
  }
});

router.get('/AdventureWorks', async function (req: Request, res: Response, next: NextFunction) {
  console.log('GET /AdventureWorks');

  try {
    const r = await getDatabaseOutline();

    res.send(r);
  } catch (err) {
    return next(err);
  }
});

