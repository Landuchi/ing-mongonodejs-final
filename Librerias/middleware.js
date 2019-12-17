//const rutasProtegidas = express.Router();
//rutasProtegidas.use();
const jwt = require('jsonwebtoken');
const configs = require('../Config/configs');

function verificacion(req, res, next) {
switch(req.path){
    case '/api/users/login':
        next();
        return;
    case '/api/users/registro':
        next();
        return;
}
    const token = req.headers['authorization'];

    if (token) {
      jwt.verify(token, configs.llave, (err, decoded) => {
        if (err) {
          return res.json({ mensaje: 'Token inválida' });
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      res.send({
          mensaje: 'Token no proveída.'
      });
    }
 }

module.exports = verificacion;
