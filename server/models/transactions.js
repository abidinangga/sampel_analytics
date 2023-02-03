const { ObjectId } = require("bson");
const { getDatabase } = require("../config/mongodb");
const Account = require("./accounts");

class Transaction {
  static async findAll(payload) {
    if (payload.highest) {
      try {
        let data = await getDatabase()
          .collection("trancations")
          .aggregate([{ $macth: { price: 1 } }]);
        return data;
      } catch (error) {
        return {
          name: "Error",
          message: error,
        };
      }
    }
    if (payload.lowest) {
      try {
        let data = await getDatabase()
          .collection("trancations")
          .aggregate([{ $macth: { price: 1 } }]);
        return data;
      } catch (error) {
        return {
          name: "Error",
          message: error,
        };
      }
    }
    if (payload.range1 && payload.range2) {
      try {
        let data = await getDatabase()
          .collection("trancations")
          .find({
            price: {
              $gte: payload.range1,
              $lt: payload.range2,
            },
          });
        return data;
      } catch (error) {
        return {
          name: "Error",
          message: error,
        };
      }
    }
    if (payload.codeTransaction) {
      try {
        let data = await getDatabase()
          .collection("trancations")
          .find({ transaction_code: payload.codeTransaction });
        return data;
      } catch (error) {
        return {
          name: "Error",
          message: error,
        };
      }
    }
    return getDatabase().collection("transactions").find().toArray();
  }
  static findById(id) {
    return getDatabase()
      .collection("accounts")
      .find({ _id: ObjectId(id) })
      .toArray();
  }
  static addTransaction(payload) {
    return getDatabase().collection("transactions").insertOne(payload);
  }
  static findTransactionByAmount(payload) {
    return getDatabase().collection("transactions").find({ amount: payload });
  }
  static deleteTransaction(id) {
    return getDatabase()
      .collection("transactions")
      .deleteOne({ _id: ObjectId(id) });
  }
  static editTrancation(payload, id) {
    return getDatabase()
      .collection("trancations")
      .find({ _id: ObjectId(id) }, { $set: payload });
  }
}

module.export = Transaction;
