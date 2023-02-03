const {MongoClient} = require('mongodb')
// Connection URL
// const url = "mongodb://localhost:27017/";
// const url = "mongodb://cluster0-shard-00-00.qs4pi.mongodb.net:27017";
const url =
"mongodb+srv://testuser:testestest123@ac-byx1cqa-shard-00-02.za6sena.mongodb.net/?ssl=true&replicaSet=atlas-hsbap9-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "sample_analytics";

let db;

function connects(callback) {
  client.connect((err,data) => {
    if (err) {
      console.log(err);
      console.log("not connected");
    } else {
      db = data.db(dbName);
      console.log(`success`);
    }
  });
}

function getDatabase() {
  return db;
}

module.exports = { connects, getDatabase };
