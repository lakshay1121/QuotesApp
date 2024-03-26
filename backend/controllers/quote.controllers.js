import { Quote } from "../models/quote.models.js";

export const getAllQuotes = async (req, res) => {
  try {
    const mergedQuotes = await Quote.aggregate([
      {
        $unwind: "$quotes",
      },
      {
        $group: {
          _id: "$ownerId",
          quotes: { $push: "$quotes" },
        },
      },
    ]);

    res.status(200).json({
      message: "Quotes aggregated successfully!",
      mergedQuotes,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error while aggregating quotes",
    });
  }
};

export const getAllQuotesOfUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID not provided in the URL" });
    }

    const quotes = await Quote.find({ ownerId: userId });
    if (!quotes || quotes.length === 0) {
      return res
        .status(404)
        .json({ message: "No quotes found for the specified user" });
    }

    return res.status(200).json({
      message: "Quotes fetched successfully",
      quotes,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const postQuotes = async (req, res) => {
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

export const deleteQuote = async (req, res) => {
  const quoteID = req.params.id;

  if (!quoteID) return res.status(400).json({ message: "No ID Provided" });
  try {
    let quote = await Quote.updateOne(
      { "quotes._id": quoteID },
      { $pull: { quotes: { _id: quoteID } } }
    );

    if (quote.modifiedCount === 0)
      return res.status(404).json({ message: "Quote not found" });
    return res
      .status(200)
      .json({ message: "Quote deleted successfully", quote });
  } catch (error) {
    return res.status(500).json({ message: `Server Error : ${error}` });
  }
};

export const updateQuote = async (req, res) => {
  const updateQuoteObj = req.body;
  const quoteID = req.params.id;

  try {
    if (!quoteID)
      return res.status(400).json({ message: "Quote ID not provided" });
    if (!updateQuoteObj || Object.keys(updateQuoteObj).length === 0)
      return res.status(400).json({ message: "No data provided to update" });

    const updateObject = {};
    for (const [key, value] of Object.entries(updateQuoteObj)) {
      updateObject[`quotes.$.${key}`] = value;
    }

    const quoteUpdated = await Quote.updateOne(
      { "quotes._id": quoteID },
      { $set: updateObject }
    );

    if (!quoteUpdated)
      return res.status(404).json({ message: "Quote not found" });

    if (quoteUpdated.modifiedCount === 0)
      return res.status(200).json({ message: "No value updated!" });

    return res
      .status(200)
      .json({ message: "Quote updated successfully!", quoteUpdated });
  } catch (error) {
    console.error("Error updating quote:", error);
    return res
      .status(500)
      .json({ message: "Error while updating quote", error: error.message });
  }
};
