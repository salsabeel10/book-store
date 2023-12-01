import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

//route to save new book
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "send all req fields:title,author,publishyear",
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
  
      return res.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  // get full books
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
  
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  //get one book
  
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
  
      return res.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  //to update the book
  
  router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "send all req fields:title,author,publishyear",
        });
      }
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        return res.send(404).json({ message: "Book not Found" });
      }
      return res.status(200).send({ message: "Book updated" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  //book delete
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
        return res.send(404).json({ message: "Book not Found" });
      }
      return res.status(200).send({ message: "Book Deleted Succesfully" });
    } catch (error) {
      console.log(err.message);
      res.status(500).send({ message: error.message });
    }
  });

export default router;