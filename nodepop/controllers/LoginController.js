const {User} = require('../models')

class LoginController {
    index(req, res, next) {
      // if user is logged in redirect to index
      if (req.session.userId) {
        res.redirect('/');
        return;
      }
      
      res.locals.error = 'ERROR';
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
              res.render('login');
              return;
            }

            // Save user id in the session
            req.session.userId = user._id;


            // when correct credentials
            res.redirect('/');
            console.log(redirect)
      
      } catch (error) {
        next(error);
      }
    }

    logout(req, res, next) {
      req.session.regenerate(err => {
        if (err) {
          next(err);
          return;
        }
        res.redirect('/');
      })
    }
    
}
module.exports = LoginController