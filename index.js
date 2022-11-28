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
    const productCollection = client.db("recycleHut").collection("products");
    const userCollection = client.db("recycleHut").collection("users");
    const bookingCollection = client.db("recycleHut").collection("bookings");

    app.get('/categories', async (req, res) => {
      const query = {};
      const categories = await categoryCollection.find(query).toArray();
      res.send(categories);
    })

    app.get('/product-category', async (req, res) => {
      const query = {}
      const result = await androidPhoneCollection.find(query).project({ name: 1 }).toArray();
      res.send(result);
    })

    app.get('/category/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const category = await categoryCollection.findOne(query);
      res.send(category);
    });

    // Bookings API
    app.get('/bookings', async (req, res) => {
      const query = {};
      const bookings = await bookingCollection.find(query).toArray();
      res.send(bookings);
    })

    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      const query =
      {
        mobileName: booking.mobileName,
        buyerEmail: booking.buyerEmail,
      }

      const alreadyBooked = await bookingCollection.find(query).toArray();

      if (alreadyBooked.length) {
        const message = `You already booked ${booking.mobileName}`
        return res.send({ acknowledged: false, message })
      }

      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });



    //Products API
    app.get('/products', async (req, res) => {
      const query = {};
      const products = await productCollection.find(query).toArray();
      res.send(products);
    })

    app.get('/products/:category', async (req, res) => {
      const category = req.params.category;
      const query = { category };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    app.post('/products', async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });

    app.delete('/products/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await productCollection.deleteOne(filter);
      res.send(result);
    })

  }
  finally {
  }
};
run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Recycle Hut server is running on port", port);
});