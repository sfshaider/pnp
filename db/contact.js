const NedB = require('nedb');

var contactInfo = new NedB({filename : 'contactInfo.db', autoload: true });

module.exports = {
    contactInfo
}