class LangController {
    changeLocale(req, res, next) {
      const locale = req.params.locale
  
      // add cookie with language
      res.cookie('nodepop-locale', locale, {
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
      })
  
      // redirect to same page
      res.redirect('back')
    }
  }
  
  module.exports = LangController