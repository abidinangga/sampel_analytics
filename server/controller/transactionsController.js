const { Account, Customer, Transaction } = require("../models/transactions");
const midtransClient = require("midtrans-client");
class transactions {
  static async showAll(req, res, next) {
    try {
      const dataAccount = await Account.findById(req.params.id);
      const highest = req.query.highest;
      const lowest = req.query.lowest;
      const range1 = req.query.range1;
      const range2 = req.query.range2;
      const codeTransaction = req.query.codeTransaction;
      let option = {
        order: [],
        where: { account_id: dataAccount.account_id },
        between: {},
      };
      if (highest) {
        option.order = {
          ...option.order,
          price: ["price", "desc"],
        };
      }
      if (lowest) {
        option.order = {
          ...option.order,
          price: ["price", "asc"],
        };
      }
      if (range1 && range2) {
        option.between = {
          ...option.between,
          price: [range1, range2],
        };
      }
      if (codeTransaction) {
        option.where = {
          transaction_code: codeTransaction,
          ...option.where,
        };
      }
      let data = await Transaction.findAll(option);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addCart(req, res, next) {
    try {
      let idCustomer = req.params.id;
      const customer = await Customer.findOne(idCustomer);
      let Data = {
        date: req.body.date,
        amount: req.body.amount,
        transaction_code: req.body.transaction_code,
        symbol: req.body.symbol,
        price: +req.body.price,
        total: +req.body.total,
      };
      const newcart = await Transaction.addTransaction(
        { transactions: Data },
        {
          where: {
            account_id: customer.account_id,
          },
        }
      );
      res.status(201).json(newcart);
    } catch (error) {
      next(error);
    }
  }
  static async payment(req, res, next) {
    try {
      let id = req.params.id;
      const dataTransaction = await Transaction.findById(id);
      let amount = dataTransaction.transaction.amount;
      const transactionAmount = await Transaction.findTransactionByAmount(amount);
      let parameter = {
        transaction_details: {
          order_id: Math.floor(Math.random() * 100000),
          gross_amount: transactionAmount.price,
        },
        credit_card: {
          secure: true,
        },
      };
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "SERVER_KEY",
        clientKey: "CLIENT_KEY",
      });
      const transaction = await snap.createTransaction(parameter);
      res.status(201).json({
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = transactions;
