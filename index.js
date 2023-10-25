const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6mgvkkt.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

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
   
    const cardCollection = client.db('cardDB').collection('card');
   
    app.get('/card', async(res, req)=> {
       const cursor = cardCollection.find();
       const result = await cursor.toArray();
       res.send(result);
    })

    app.post('/card', async(res,req)=>{
      const newCard = req.body;
      console.log(newCard);
      const result = await cardCollection.insertOne(newCard);
       res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/addProduct', (req,res)=>{
      res.send("Product is server running")
})
app.listen(port, ()=>{
    console.log(`Product hab added by : ${port}`)
})