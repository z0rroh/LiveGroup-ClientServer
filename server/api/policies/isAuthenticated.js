/**
 * isAuthenticated
 * @description :: Policy to inject user in req via JSON Web Token
 */
var passport = require('passport');

module.exports = function (req, res, next) {

    if(req.isSocket){

        passport.authenticate('jwt', function (error, user, info) {
          if (error) {
            return res.json({
              code: 'SIGNIN_ERR',
              message: 'Ah ocurrido un error inesperado'
            });
          }
          if (!user){
            return res.json({
              code: 'SIGNIN_ERR',
              message: 'Para acceder a esta funcionalidad necesitas iniciar sesion'
            });
          }
         req.user = user;
         next();
        })(req, res);
    }else{

        passport.authenticate('jwt', function (error, user, info) {
          if (error) {
            return res.json({
              code: 'SIGNIN_ERR',
              message: 'Ah ocurrido un error inesperado'
            });
          }
          if (!user){
            return res.json({
              code: 'SIGNIN_ERR',
              message: 'Para acceder a esta funcionalidad necesitas iniciar sesion'
            });
          }
         req.user = user;
         next();
        })(req, res);
    }

};
