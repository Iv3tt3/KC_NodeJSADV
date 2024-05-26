const {User} = require('../models')

class LoginController {
    index(req, res, next) {
        res.locals.error = '';
        res.locals.email = '';
        res.render('login')
    }
    
    async post(req, res, next) {
        try {
            const { email, password } = req.body;
      
            // find user in db
            const user = await User.findOne({ email: email })
      
            // throw error when user does not exist or incorrect password
            if (!user || !(await user.comparePassword(password))) {
              res.locals.error = 'Invalid credentials';
              res.locals.email = email;
              console.log('Invalid email')
              res.render('login');
              return;
            }
            
            // when correct credentials
            res.redirect('/');
            console.log(redirect)
      
      } catch (error) {
        next(error);
      }
    }
}
module.exports = LoginController