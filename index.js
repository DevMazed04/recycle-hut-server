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
    const featurePhoneCollection = client.db("recycleHut").collection("featurePhones");
    const androidPhoneCollection = client.db("recycleHut").collection("androidPhones");
    const bookingCollection = client.db("recycleHut").collection("bookings");

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


    app.get('/androidPhones', async (req, res) => {
      const query = {};
      const androidPhones = await androidPhoneCollection.find(query).toArray();
      res.send(androidPhones);
    });

    app.get('/androidPhone/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const androidPhone = await androidPhoneCollection.findOne(query);
      res.send(androidPhone);
    });

    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      console.log(booking);
      const query = {
        mobileName: booking.mobileName,
        email: booking.email,
        treatment: booking.treatment
      }

      const alreadyBooked = await bookingCollection.find(query).toArray();

      if (alreadyBooked.length) {
        const message = `You already booked ${booking.mobileName}`
        return res.send({ acknowledged: false, message })
      }

      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    });

  }
  finally {
  }
};
run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Recycle Hut server is running on port", port);
});