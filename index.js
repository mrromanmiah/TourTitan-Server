const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jjwufqp.mongodb.net/?retryWrites=true&w=majority`;

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
        const packageCollection = client.db('tourTitan').collection('packages');
        const storyCollection = client.db('tourTitan').collection('stories');

        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/allPackages', async (req, res) => {
            const cursor = packageCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get('/tourType', async (req, res) => {
            const cursor = packageCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/packages/:tourType', async (req, res) => {
            const tourType = req.params.tourType || '';
            const query = {tourType: tourType};
            const result = await packageCollection.find(query).toArray();
            res.send(result);
        })




























        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('tourTitan is running');
});

app.listen(port, () => {
    console.log(`tourTitan server is listening on port: ${port}`);
});