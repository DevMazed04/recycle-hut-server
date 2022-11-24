const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

//middlewares
app.use(cors());
app.use(express.json());

//database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vfwjfcr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get("/", (req, res) => {
   res.send("Recycle Hut API is running");
});


const run = async () => {
   try {
      const categoryCollection = client.db("recycleHut").collection("categories");

      app.get('/categories', async (req, res) => {
         const query = {};
         const cursor = categoryCollection.find(query);
         const categories = await cursor.toArray();
         res.send(categories);
      })
   }
   finally {
   }
};
run().catch((err) => console.log(err));

app.listen(port, () => {
   console.log("Recycle Hut server is running on port", port);
});