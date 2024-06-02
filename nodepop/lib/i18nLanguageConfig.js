const i18n = require('i18n');
const path = require('node:path');

// configuration options
i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locals'),
  defaultLocale: 'en',
  autoReload: true, // Watch for changes in json files to reload locale on updates
  syncFiles: true, // Sync locale information across all files
  cookie: 'nodepop-locale',
})

// to use script
i18n.setLocale('en');

module.exports = i18n