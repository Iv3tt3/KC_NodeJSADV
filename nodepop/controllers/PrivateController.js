const { User, Advert } = require('../models')
const createError = require('http-errors')

class PrivateController {

  async index(req, res, next) {
    try {

        const userId = req.session.userId

        // find user in database
        const user = await User.findById(userId)

        if (!user) {
            next(createError(500, 'user not found'))
            return
        }

        // find list of adverts of the user
        const adverts = await Advert.find({ owner: userId })

      res.render('private', {
        title: "My ads",
        adverts
      });
      console.log(adverts)

    } catch (error) {
      next(error)
    }
  }

}

module.exports = PrivateController;