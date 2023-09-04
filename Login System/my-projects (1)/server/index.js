require('dotenv').config();
// console.log(process.env)
const { MONGO_URL, PORT } = process.env;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

// MONGO_URL =
//     "mongodb+srv://mayankkrishna1:vFNoMwYORfQ5yXrX@cluster0.rhpbsmf.mongodb.net/?retryWrites=true&w=majority";
// PORT = 4000;

// console.log(process.env.PORT, process.env.MONGO_URL)
console.log(PORT, MONGO_URL)

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);



// =============================
/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mayankkrishna1:<password>@cluster0.rhpbsmf.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir); */