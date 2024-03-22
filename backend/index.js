import express from 'express';
const app = express();
import { connectToDB } from './db/db.js';
import userRouter from './routes/user.routes.js'
import quoteRouter from './routes/quote.routes.js';
import cors from 'cors';

//middlewares.
app.use(express.json({limit: "50mb"})); 
app.use(express.urlencoded({extended:true}));
app.use(cors());

//DB connection.

connectToDB();

// user routes.
app.use('/api/v1/auth',userRouter);

// quote routes.

app.use('/api/v1/users' , quoteRouter);


app.listen(process.env.PORT , (req, res) => {
    console.log(`App listening on port ${process.env.PORT}`)
})