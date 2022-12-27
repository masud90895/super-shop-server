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

    // today deal

    app.get("/todayDeals", async (req, res) => {
      const result = await todayDealsCollection.find({}).toArray();
      res.send(result);
    });

    app.get("/todayDeals/:id", async (req, res) => {
      const id = req.params.id;
      const result = await todayDealsCollection.findOne({_id: ObjectId(id)})
      res.send(result);
    });

    // summer collection
    app.get("/summer", async (req, res) => {
      const result = await summerCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/summer/:id", async (req, res) => {
      const id = req.params.id;
      const result = await summerCollection.findOne({_id: ObjectId(id)})
      res.send(result);
    });

    // electronicCollection

    app.get("/electronic", async (req, res) => {
      const result = await electronicCollection.find({}).toArray();
      res.send(result);
    });
    app.get("/electronic/:id", async (req, res) => {
      const id = req.params.id;
      const result = await electronicCollection.findOne({_id: ObjectId(id)})
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

    // globalProductsCollection

    app.get("/globalProducts", async (req, res) => {
      const result = await globalProductsCollection.find({}).toArray();
      res.send(result);
    });

    //shareeCollection

    app.get("/sharee", async (req, res) => {
      const result = await shareeCollection.find({}).toArray();
      res.send(result);
    });

    //smartphoneCollection

    app.get("/smartphone", async (req, res) => {
      const result = await smartphoneCollection.find({}).toArray();
      res.send(result);
    });

    app.get("/smartphone/:id", async (req, res) => {
      const id = req.params.id;
      const result = await smartphoneCollection.findOne({_id: ObjectId(id)})
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
