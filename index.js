const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

//middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vfwjfcr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});


app.get("/", (req, res) => {
   res.send("Recycle Hut API is running");
});

app.listen(port, () => {
   console.log("Recycle Hut server is running on port", port);
});