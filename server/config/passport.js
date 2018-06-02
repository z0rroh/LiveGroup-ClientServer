/**
 * Passport configuration file where you should configure strategies
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;


var EXPIRES_IN_MINUTES = 5000;
var SECRET = process.env.tokenSecret || "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM";
var ALGORITHM = "HS256";
var ISSUER = "livegroup.cl";
var AUDIENCE = "livegroup.cl";

/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JWT_STRATEGY_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: SECRET,
  issuer : ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false
};

  /**
   * Triggers when user authenticates via local strategy
   */
  function _onLocalStrategyAuth(email, password, next) {

    User.findOne({email: email})
      .exec(function (error, user) {
        if (error){
          return next(error, false, {
          code: 'SIGNIN_ERR',
          message: 'Ah ocurrido un error inesperado'
          });
        }

        if(!user) {
          return next(null, false, {
            code: 'SIGNIN_NO_E',
            message: 'El email ingresado no se encuentra registrado'
          });
        }

        if (!CipherService.comparePassword(password, user)){
          return next(null, false, {
            code: 'SIGNIN_INVALID',
            message: 'La cambinacion de email y contraseña no es valida'
          });
        }


        return next(null, user, {});
      });
  }

  /**
   * Triggers when user authenticates via JWT strategy
   */
  function _onJwtStrategyAuth(payload, next) {
    var user = payload.user;
    return next(null, user, {});
  }

  passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
  passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

  module.exports.jwtSettings = {
    expiresIn: EXPIRES_IN_MINUTES,
    secret: SECRET,
    algorithm : ALGORITHM,
    issuer : ISSUER,
    audience : AUDIENCE
};
