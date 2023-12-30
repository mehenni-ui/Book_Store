const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded
      next();
    } catch (error) {
      return res.status(401).json({ message: "invalid token", err: error });
    }
  } else {
    return res
      .status(401)
      .json({ message: "you are not authorized (no token)" });
  }
}


function verifyTokenAndAuthorization(req, res, next){
      verifyToken(req, res, ()=>{
            console.log("(",req.user,")");
            if (req.user.id === req.params.id || req.user.isAdmin) {
                  next()
            }else{
                  return res.status(401).json({ message: "you are not allowed (not admin or the user itself)"});  
            }
      })
}

function verifyTokenAndAdmin(req, res, next){
      verifyToken(req, res, ()=>{
            if (req.user.isAdmin) {
                  next()
            }else{
                  return res.status(401).json({ message: "you are not allowed (not admin)"});  
            }
      })
}
module.exports = {
  verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin
};
