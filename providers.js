
var auth_setting = {
   "clientID": process.env.clientID,
   "clientSecret": process.env.clientSecret,
   "callbackURL": process.env.callbackURL,
};

var base_setting = {
   "provider": "facebook",
   "module": "passport-facebook",
   "authPath": "/auth/facebook",
   "callbackPath": "/auth/facebook/callback",
   "successRedirect": "/authredirect",
   "scope": ["email"]
}

var facebook_login = Object.assign(base_setting,auth_setting);

module.exports = {
 "facebook-login": facebook_login
}
