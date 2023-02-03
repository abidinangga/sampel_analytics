const { ObjectId } = require("bson");
const { getDatabase } = require("../config/mongodb");

class Account {

  static findAll() {
    return getDatabase().collection("accounts").find().toArray();
  }
  static findById(id) {
    return getDatabase().collection("accounts").find({ _id: ObjectId(id) }).toArray();
  }
  static addAccount(payload) {
    return getDatabase().collection("accounts").insertOne(payload);
  }
  static deleteAccount(id) {
    return getDatabase()
      .collection("accounts")
      .deleteOne({ _id: ObjectId(id) });
  }
  static editAccount(payload, id) {
    return getDatabase()
      .collection("accounts")
      .find({ _id: ObjectId(id) }, { $set: payload });
  }
}

module.export = Account;
