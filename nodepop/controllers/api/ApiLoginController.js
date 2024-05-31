const {User} = require('../../models')
const jwt = require('jsonwebtoken');

class ApiLoginController {
    
    async post(req, res, next) {
        try {
          const { email, password} = req.body;
          // find user in db
          const user = await User.findOne({ email: email });
    
          // throw error if don't find the user
          if (!user || !(await user.comparePassword(password))) {
            res.json({ error: 'Invalid credentials' });
            return;
          }
    
          // if user exists and password is correct set a JWT with userID data
          const tokenJWT = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '2h'
          });
    
          res.json({ tokenJWT: tokenJWT });
    
        } catch (error) {
          next(error)
        }
    }
}

module.exports = ApiLoginController