const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
// .........................................

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://chandra98au:EWCdATZ1soDCW6p6@cluster0.aymawxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let result = [];
let carsdata = [];
async function run() {
  try {
    await client.connect();
    await client.db('testdata').command({ ping: 1 });
    const db = client.db('testdata');
    const carsData = db.collection('cars');
    const data = await carsData.find().toArray();
    result = data;
    carsdata = carsData;
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// ............................................
app.get('/api/cars', (req, res) => {
  res.json({
    statuscode: 200,
    data: result,
    message: 'retrieved',
  });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
// -------------------------------------------------------

app.post('/api/submit', async (req, res) => {
  try {
    const catData = req.body;
    await client.connect();
    await client.db('testdata').command({ ping: 1 });
    const db = client.db('testdata');
    const collection = db.collection('cars');

    await collection.insertOne(catData);
    console.log('Car post successful');
    res.send({ message: 'Car post successful' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
  await client.close();
});
