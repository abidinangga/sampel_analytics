const {Account , Customer, Transaction} = require('../models/customers');


class customers{
  static async showAll(req, res, next) {
    try {
      let search = req.query.name
      if(search){
       let data = await Customer.findAll({
        include: [{ model: Account }],
        where:{
          name:{[iLike]:`%${search}%`
        }}})
      }else{
        let data = await Customer.findAll();
      }
      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = customers