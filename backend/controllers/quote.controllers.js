import { Quote } from "../models/quote.models.js";

export const getAllQuotes = async (req, res) => {};

export const getAllQuotesOfUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID not provided in the URL" });
        }

        const quotes = await Quote.find({ ownerId: userId });
        if (!quotes || quotes.length === 0) {
            return res.status(404).json({ message: "No quotes found for the specified user" });
        }

        return res.status(200).json({
            message: "Quotes fetched successfully",
            quotes
        });
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return res.status(500).send("Internal Server Error");
    }
  
};


export const postQuotes = async (req, res) => {
  // get data from  the request body.

  const { author, title, content, userId } = req.body;
  if (!title || !content || !userId || !author) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const quote = {
      author,
      title,
      content,
    };

    let newQuote = await Quote.findOne({ ownerId: userId });

    if (!newQuote) {
      newQuote = await Quote.create({
        ownerId: userId,
        quotes: [quote],
      });
    } else {
      newQuote.quotes.push(quote);
      await newQuote.save();
    }

    const createdQuote = await Quote.findById({ _id: newQuote.id });

    if (!createdQuote) return res.status(500).send("Error creating quote");
    return res.status(201).json({
      message: "Quote added successfully!",
      createdQuote,
    });
  } catch (error) {
    console.error("Error creating quote:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateQuote = async (req, res) => {};

export const testRoute = async (req, res) => {
    res.status(200).json.parse({
        message:"hello"
    })
}
