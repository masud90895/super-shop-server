const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
//gitignor
require("dotenv").config();
const port = process.env.PORT || 5000;

// used Middleware
app.use(cors());
// backend to client data sent
app.use(express.json());

// Connact With MongoDb Database
const uri =
  "mongodb+srv://supershop:supershop@cluster0.2vi6qur.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Create a async fucntion to all others activity
async function run() {
  try {
    // Create Database to store Data
    const categoryCollection = client.db("supershop").collection("category");
    const todayDealsCollection = client
      .db("supershop")
      .collection("todayDeals");
    const summerCollection = client.db("supershop").collection("summer");
    const electronicCollection = client
      .db("supershop")
      .collection("electronic");
    const womensCollection = client.db("supershop").collection("womens");
    const ladiesBagCollection = client.db("supershop").collection("ladiesBag");
    const globalProductsCollection = client
      .db("supershop")
      .collection("globalProducts");
    const shareeCollection = client.db("supershop").collection("sharee");
    const smartphoneCollection = client
      .db("supershop")
      .collection("smartphone");
    const foryouCollection = client.db("supershop").collection("foryou");

    // today deal

    app.get("/todayDeals", async (req, res) => {
      const result = await todayDealsCollection.find({}).toArray();
      res.send(result);
    });

    // summer collection
    app.get("/summer", async (req, res) => {
      const result = await summerCollection.find({}).toArray();
      res.send(result);
    });

    // electronicCollection

    app.get("/electronic", async (req, res) => {
      const result = await electronicCollection.find({}).toArray();
      res.send(result);
    });

    // women collection 

    app.get("/women", async (req, res) => {
      const result = await womensCollection.find({}).toArray();
      res.send(result);
    });


    // ladiesBagCollection

    app.get("/ladiesBag", async (req, res) => {
      const result = await ladiesBagCollection.find({}).toArray();
      res.send(result);
    });






  } finally {
    // await client.close();
  }
}

// Call the fuction you decleare abobe
run().catch(console.dir);

// Root Api to cheack activity
app.get("/", (req, res) => {
  res.send("Hello From server!");
});

app.listen(port, () => console.log(`Server up and running ${port}`));
