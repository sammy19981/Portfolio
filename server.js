/*const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
*/
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: true }));

const mongoUri = 'mongodb://localhost:27017';
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/submit-email', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db("PortfolioDB").collection("emails");
        await collection.insertOne({ email: req.body.email });
        res.send('Email saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving email');
    } finally {
        await client.close();
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

