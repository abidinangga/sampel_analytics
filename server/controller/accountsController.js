const {Account , Customer, Transaction} = require('../models/accounts');

class accounts{
  static async showAll(req, res, next) {
    try {
      let data = await Account.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }
 static async accountById(req,res,next){
  try {
    let id = req.params.id
    const data = await Account.findById(id)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
 }
}

module.exports = accounts