const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d0roctp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const perfumeCollection = client.db('perfumeInventory').collection('perfumes');

        //post an item
        app.post('/add/item', async (req, res) => {
            const item = req.body;
            console.log(item);

            const result = await perfumeCollection.insertOne(item);
            res.send(result);
        });


        
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Perfume Inventory server is running');
});


app.listen(port, () => {
    console.log(`Perfume Inverntory is listening on port: ${port}`);
});

