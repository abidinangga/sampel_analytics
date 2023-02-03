const { ObjectId } = require("bson");
const { getDatabase } = require("../config/mongodb");

class Customers {
  static findAll(payload) {
    if(!payload){
      return getDatabase().collection("customers").find().toArray();

    }else{
      return getDatabase().collection("customers").find({"username":payload}).toArray();
    }
  }
  static addCustomer(payload) {
    return getDatabase().collection("customers").insertOne(payload);
  }
  static deleteCustomer(id) {
    return getDatabase()
      .collection("customers")
      .deleteOne({ _id: ObjectId(id) });
  }
  static editCustomer(payload, id) {
    return getDatabase()
      .collection("customers")
      .find({ _id: ObjectId(id) }, { $set: payload });
  }
}

module.export = Customers;
