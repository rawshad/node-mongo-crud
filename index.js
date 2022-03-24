const express = require("express");
const bodyParser = require("body-parser")
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const password = "yjgTvAmGCoqqqErX";
const uri = "mongodb+srv://mycrudapplication:yjgTvAmGCoqqqErX@cluster0.6vjc7.mongodb.net/crudAppDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})



client.connect(err => {
  const collection = client.db("crudAppDatabase").collection("appData");
  app.get("/products", (req, res) => {
    collection.find({}).toArray((err, documents) => {
      res.send(documents);
    })
  })
  app.post("/addProduct", (req, res) => {
    const product = req.body;
    collection.insertOne(product)
    .then(result=>{
        console.log("data added successfully.");
        res.send("successfull");
      })
  })
  app.delete("/delete/:id", (req, res) => {
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
      console.log(result);
    })
  })
});


app.listen(5000);