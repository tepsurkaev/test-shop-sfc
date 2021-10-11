const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      return res.status(401).json('Неправильный тип токена');
    }

    if (!token) {
      return res.status(401).json('Неправильный токен');
    }

    req.user = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (e) {
    return res.status(401).json(e.toString());
  }
};
