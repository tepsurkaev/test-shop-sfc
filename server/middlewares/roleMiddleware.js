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

    const verify = jwt.verify(token, process.env.SECRET_KEY);

    if (verify.role !== 'admin') {
      return res.status(401).json('Нет довтупа');
    }

    req.user = verify;

    next();
  } catch (e) {
    return res.status(401).json(e.toString());
  }
};
