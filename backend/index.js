import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

//middleware for pardsing req body
app.use(express.json());

app.use(cors({
  origin:"http://localhost:3000/",
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type'],
}))

app.get("/", (req, res) => {
    console.log(req);
  return res.status(234).send("welcome");
});

//Route for save book
app.use("/books", bookRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log("Connected to " + PORT + " port");
    });
  })
  .catch((error) => {
    console.log(error);
  });
