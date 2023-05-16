import { Router } from 'express';
import UserController from './controller/UserController.js';
import * as Auth from './middleware/auth.middleware.js';
import ClientController from './controller/ClientController.js';
import QuoteController from './controller/QuoteController.js';

const routes = Router();

// User Controller
// routes.route('/user').post(Auth.authorize(['VALOR DA PERMISSAO']), UserController.create);
routes.post('/user', UserController.create);
routes.get('/users', UserController.findAll);
routes.route('/login').post(UserController.findOne);

// Client Controller
routes.get('/clients', ClientController.findAll);

// Quote Controller
routes.get('/quotes', QuoteController.findAll);
routes.post('/quote', QuoteController.create);
routes.get('/qualities', QuoteController.findAllQualityStatus);
routes.patch('/quality/approve/:id', QuoteController.approveQuality);
routes.patch('/quote/approve/:id', QuoteController.approveQuote);
routes.get('/prods', QuoteController.findAllProdStatus);
routes.patch('/prod/approve/:id', QuoteController.approveProd);
routes.get('/products', QuoteController.findAllFinishedStatus);


export default routes;
