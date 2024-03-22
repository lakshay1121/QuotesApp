import Router from 'express';
import { getAllQuotes, getAllQuotesOfUser, postQuotes, testRoute } from '../controllers/quote.controllers.js';

const router = Router();

router.route('/quotes').get(getAllQuotes);
router.route('/quotes/:id').get(getAllQuotesOfUser);
router.route('/quotes/add').post(postQuotes);

export default router;