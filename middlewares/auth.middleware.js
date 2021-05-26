const jwt = require('jsonwebtoken');

module.exports.Auth= (req, res, next)=>{
  try {
    const token = req.cookies.token;
    const decode = jwt.verify(token, "Tee_secret");
    req.userData = decode;
    next();
  } catch (error) {
    res.redirect('/login');
  }
}