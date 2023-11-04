const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
//gitignore
require("dotenv").config();
const port = process.env.PORT || 5000;

// ssl commerce
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

// used Middleware
app.use(cors());
// backend to client data sent
app.use(express.json());

// Connect With MongoDb Database
const uri =
  "mongodb+srv://supershop:supershop@cluster0.2vi6qur.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Create a async function to all others activity
async function run() {
  try {
    // Create Database to store Data
    // products
    const productsCollection = client.db("supershop").collection("products");
    const userCollection = client.db("supershop").collection("user");
    const addToCartCollection = client.db("supershop").collection("addToCart");
    const sellerRequestCollection = client
      .db("supershop")
      .collection("sellerRequest");
    const buyProductCollection = client
      .db("supershop")
      .collection("buyProduct");

    // post product
    app.post("/products", async (req, res) => {
      const result = await productsCollection.insertOne(req.body);
      if (result.insertedId) {
        res.send(result);
      }
    }
    );

    // get all product
    app.get("/products", async (req, res) => {
      const result = await (await productsCollection.find({}).toArray()).reverse();
      res.send(result);
    });

    app.get("/allproducts", async (req, res) => {
      const category = req.query.category;
      const result = await productsCollection
        .find({ collections: category })
        .toArray().reverse();
      res.send(result);
    });

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productsCollection.findOne({ _id: ObjectId(id) });
      res.send(result);
    });

    // delete product
    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      if (result.deletedCount) {
        res.send(result);
      }
    })

    // today deal

    app.get("/todayDeals", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Today'sDeals" })
        .toArray().reverse();
      res.send(result);
    });

    // summer collection
    app.get("/summer", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Summercollections" })
        .toArray().reverse();
      res.send(result);
    });

    // electronicCollection

    app.get("/electronic", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Electronics" })
        .toArray().reverse();
      res.send(result);
    });

    // women collection

    app.get("/women", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Women'sCollection" })
        .toArray().reverse();
      res.send(result);
    });

    // ladiesBagCollection

    app.get("/ladiesBag", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "LadiesBagCollections" })
        .toArray().reverse();
      res.send(result);
    });

    // globalProductsCollection

    app.get("/globalProducts", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "GlobalProducts" })
        .toArray().reverse();
      res.send(result);
    });

    //shareCollection

    app.get("/sharee", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "Sharee'sCollection" })
        .toArray().reverse();
      res.send(result);
    });

    //smartphoneCollection

    app.get("/smartphone", async (req, res) => {
      const result = await productsCollection
        .find({ collections: "SmartPhoneCollection" })
        .toArray().reverse();
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

    app.get("/addToCart", async (req, res) => {
      const email = req.query.email;
      const result = await addToCartCollection.find({ email: email }).toArray();
      res.send(result);
    });

    // report products

    app.put("/report/:id", async (req, res) => {
      const id = req.params.id;

      const result = await productsCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: req.body }
      );

      if (result.matchedCount) {
        res.send(result);
      }
    });

    app.get("/report", async (req, res) => {
      const result = await productsCollection.find({ report: true }).toArray();
      res.send(result);
    });

    // products question

    app.post("/question/:id", async (req, res) => {
      const id = req.params.id;

      const result = await productsCollection.updateOne(
        { _id: ObjectId(id) },
        { $push: { question: req.body } }
      );

      if (result.matchedCount) {
        res.send(result);
      }
    });

    // seller request
    app.post("/sellerRequest", async (req, res) => {
      const email = req.body.email;
      const matchEmail = await sellerRequestCollection.findOne({
        email: email,
      });
      if (matchEmail?.email === email) {
        return res
          .status(401)
          .send({ status: 401, message: "already Requested!" });
      }

      const result = await sellerRequestCollection.insertOne(req.body);
      if (result.insertedId) {
        res.send({ message: "Request Send Successful!" });
      }
    });

    app.get("/sellerRequest", async (req, res) => {
      const result = await sellerRequestCollection.find({ role: "unknown" }).toArray();
      res.send(result);
    });

    // all seller

    app.get("/allSeller", async (req, res) => {
      const result = await userCollection.find({ role: "seller" }).toArray();
      res.send(result);
    });

    //all buyer

    app.get("/allBuyer", async (req, res) => {
      const result = await userCollection.find({ role: "user" }).toArray();
      res.send(result);
    });

    //ssl commercse

    app.post("/buyProducts", async (req, res) => {
      const order = req.body;

      const transactionId = new ObjectId().toString();
      const data = {
        total_amount: order.price,
        currency: order.currency,
        tran_id: transactionId, // use unique tran_id for each api call
        success_url: `https://supershop-cc520.web.app/success?transactionId=${transactionId}`,
        fail_url: `https://supershop-cc520.web.app/fail`,
        cancel_url: `https://supershop-cc520.web.app/cancel`,
        ipn_url: "http://localhost:3030/ipn",
        shipping_method: "Courier",
        product_name: order.productName,
        product_category: order.productCatagory,
        product_profile: "general",
        cus_name: order.name,
        cus_email: order.email,
        cus_add1: order.address,
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: order.number,
        cus_fax: "01711111111",
        ship_name: order.name,
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        buyProductCollection.insertOne({
          ...order,
          transactionId,
          paid: false,
        });
        res.send({ url: GatewayPageURL });
      });
    });

    app.post("/success", async (req, res) => {
      const { transactionId } = req.query;
      const result = await buyProductCollection.updateOne(
        { transactionId },
        { $set: { paid: true, paidTime: new Date().toLocaleString() } }
      );
      if (result.modifiedCount > 0) {
        res.redirect(
          `https://supershop-cc520.web.app/success?transactionId=${transactionId}`
        );
      }
    });

    app.get("/success/:id", async (req, res) => {
      const { id } = req.params;
      const result = await buyProductCollection.findOne({ transactionId: id });
      res.send(result);
    });
    // ssl commerse end

    app.get("/tackOrder", async (req, res) => {
      const email = req.query.email;
      const result = await buyProductCollection
        .find({ email: email, paid: true })
        .toArray();
      res.send(result);
    });

    // seller approved

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
