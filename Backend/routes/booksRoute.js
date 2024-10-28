import express from "express";
import { Book } from "../models/bookmodel.js";
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("All fields are required");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
router.get("/", async (req, res) => {
  try {
    const book = await Book.find({});
    return res.status(200).json({
      count: book.length,
      books: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("All fields are required");
    }

    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    return res.status(200).send({ message: "Book updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send({ message: "book Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
