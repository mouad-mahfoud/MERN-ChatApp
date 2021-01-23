// Importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMassages.js";
import Pusher from "pusher";
import cors from "cors";

// App config
const app = express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1143339",
  key: "c40500535d3db6f51f7a",
  secret: "c7a83b904dd926dd04ee",
  cluster: "eu",
  useTLS: true,
});

// middleware
app.use(express.json());

app.use(cors());

//  db config

const dbConnectionUrl =
  "mongodb+srv://admin:X9clDNY7oMHKAIhy@cluster0.pcqyc.mongodb.net/chatdb?retryWrites=true&w=majority";

mongoose.connect(dbConnectionUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const messagesCollection = db.collection("messages");
  const changeStream = messagesCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher !");
    }
  });
});

// ????

// Api routes

app.get("/", (req, res) => res.status(200).send("hello!"));
app.get("/api/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
app.post("/api/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listen

app.listen(port, () => console.log(`Listening on localhost:${port}`));
