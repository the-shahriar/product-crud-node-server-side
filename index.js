const express = require("express");
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors');
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Port
const port = 5000;

const uri = ""
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();

        const database = client.db("Product_management");
        const productCollection = database.collection("products");

        // Get API
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({})
            const result = await cursor.toArray();
            res.send(result);
        })

        // get Single item API
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.json(result);
        })

        // Post API
        app.post('/products', async (req, res) => {
            console.log(req.body);
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })

        // Delete API
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.json(result);
        })
    } finally {

    }
}

run().catch(console.dir);


// Server running
app.get('/', (req, res) => {
    res.send("Running Product Management System");
})

app.listen(port, () => {
    console.log("Server is listening from port", port);
})
