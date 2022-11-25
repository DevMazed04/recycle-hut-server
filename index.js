const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
         const categories = await categoryCollection.find(query).toArray();
         res.send(categories);
      })

      app.get('/category/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const category = await categoryCollection.findOne(query);
         res.send(category);
      });
   }
   finally {
   }
};
run().catch((err) => console.log(err));

app.listen(port, () => {
   console.log("Recycle Hut server is running on port", port);
});