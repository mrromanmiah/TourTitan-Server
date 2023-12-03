const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const userCollection = client.db('tourTitan').collection('users');
        const wishlistCollection = client.db('tourTitan').collection('wishlist');


        app.get('/users', async(req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = {email: user.email};
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send ({message: 'User already exists', insertedId: null});
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.patch('/users/admin/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

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
        app.get('/package/:id', async (req, res) => {
            const id = req.params.id || '';
            const query = { _id: new ObjectId(id) };
            const result = await packageCollection.findOne(query);
            res.send(result);
        })

        app.get('/wishlist', async (req, res) => {
            const email = req.query.email;
            const query = {email: email}
            const result = await wishlistCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/wishlist', async (req, res) => {
            const wishPackage = req.body;
            const result = await wishlistCollection.insertOne(wishPackage);
            res.send(result);
        })

        app.delete('/wishlist/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await wishlistCollection.deleteOne(query);
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