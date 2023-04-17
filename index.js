const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Perfume Inventory server is running');
});

app.listen(port, () => {
    console.log(`Perfume Inverntory is listening on port: ${port}`);
});

