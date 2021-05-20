const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, "Tee_secret");
    req.userData = decode;
    next();
  } catch (error) {
    return res.status().json({
      message: "Auth failed"
    });
  }
}