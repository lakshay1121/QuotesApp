import Router from 'express';
import { deleteQuote, getAllQuotes, getAllQuotesOfUser, postQuotes, updateQuote} from '../controllers/quote.controllers.js';

const router = Router();

router.route('/quotes').get(getAllQuotes);
router.route('/quotes/:id').get(getAllQuotesOfUser);
router.route('/quotes/add').post(postQuotes);
router.route('/quotes/delete/:id').delete(deleteQuote);
router.route('/quotes/update/:id').patch(updateQuote);

export default router;