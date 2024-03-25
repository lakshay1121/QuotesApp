import Router from 'express';
import { deleteQuote, getAllQuotes, getAllQuotesOfUser, postQuotes} from '../controllers/quote.controllers.js';

const router = Router();

router.route('/quotes').get(getAllQuotes);
router.route('/quotes/:id').get(getAllQuotesOfUser);
router.route('/quotes/add').post(postQuotes);
router.route('/quotes/delete/:id').delete(deleteQuote);

export default router;