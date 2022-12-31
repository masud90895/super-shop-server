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
    // products
    const productsCollection = client.db("supershop").collection("products");
    const userCollection = client.db("supershop").collection("user");
    const addToCartCollection = client.db("supershop").collection("addToCart");

    app.get("/allproducts", async (req, res) => {
      const category = req.query.category;
      const result = await productsCollection
        .find({ collections: category })
        .toArray();
      res.send(result);
    });

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productsCollection.findOne({ _id: ObjectId(id) });
      res.send(result);
    });

    // today deal

    app.get("/todayDeals", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Today'sDeals" })
        .toArray();
      res.send(result);
    });

    // summer collection
    app.get("/summer", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Summercollections" })
        .toArray();
      res.send(result);
    });

    // electronicCollection

    app.get("/electronic", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Electronics" })
        .toArray();
      res.send(result);
    });

    // women collection

    app.get("/women", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Women'sCollection" })
        .toArray();
      res.send(result);
    });

    // ladiesBagCollection

    app.get("/ladiesBag", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "LadiesBagCollections" })
        .toArray();
      res.send(result);
    });

    // globalProductsCollection

    app.get("/globalProducts", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "GlobalProducts" })
        .toArray();
      res.send(result);
    });

    //shareeCollection

    app.get("/sharee", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Sharee'sCollection" })
        .toArray();
      res.send(result);
    });

    //smartphoneCollection

    app.get("/smartphone", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "SmartPhoneCollection" })
        .toArray();
      res.send(result);
    });

    //user collection

    app.post("/user", async (req, res) => {
      const result = await userCollection.insertOne(req.body);
      if (result.insertedId) {
        res.send(result);
      }
    });

    app.get("/user", async (req, res) => {
      const email = req.query.email;
      const result = await userCollection.findOne({ email: email });
      res.send(result);
    });

    // add to cart

    app.post("/addToCart", async (req, res) => {
      const result = await addToCartCollection.insertOne(req.body);
      if (result.insertedId) {
        res.send(result);
      }
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
