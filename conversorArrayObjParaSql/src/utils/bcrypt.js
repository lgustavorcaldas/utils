const bcrypt = require('bcrypt');

module.exports = {
  hashPwd: function (password) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }
}
