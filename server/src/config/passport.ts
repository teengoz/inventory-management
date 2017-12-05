import passport = require('passport');
import mongoose = require('mongoose');
import UserRepository = require('../app/repository/UserRepository');
import UserSchema = require('../app/dataAccess/schemas/UserSchema');
import User = require('../app/model/User');

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username'
},
    function(username, password, done) {
        UserSchema.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, {
                    errors: 'Đăng nhập không thành công'
                });
            }

            let _user = new User(user);

            if (!_user.validPassword(password)) {
                return done(null, false, {
                    errors: 'Đăng nhập không thành công'
                });
            }

            return done(null, user)
        })
    }
))
