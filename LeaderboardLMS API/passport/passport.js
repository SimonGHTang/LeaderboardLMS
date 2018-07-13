const bCrypt = require("bcrypt-nodejs");
const Models = require("../models");

module.exports = function(passportApp, userModel) {
    var LocalStrategy = require('passport-local').Strategy;

    passportApp.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passportApp.deserializeUser(function(id, done) {
        userModel.findById(id).then(function(user) {
            if(user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passportApp.use("local-signup", new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        function(req, email, password, done) {

            Promise.all([Models.Invitations.getByLink(req.params.link), userModel.getUser(null, email, Models)]).then(([link, user]) => {

                if(!link) { return done("Invalid invitation link", false); }

                if(req.user != null) {
                    Models.Courses.getCourseIncludingUser(link.course_id, null, req.user.email, Models).then(function(course) {
                        if(course && course.Users[0].email == req.user.email) {
                            return done ("You are already registered here", null);
                        } else {
                            Models.Roles.insert(link.course_id, req.user.id, "student").then(function(role){
                                if(!role) {
                                    return done ("Apologies. I'm afraid there was ana error registering you to this course, please try again another time.", false);
                                } else {
                                    return done(null, req.user);
                                }
                            });
                        }
                    });
                } else {
                    Models.Courses.getCourseIncludingUser(link.course_id, null, email, Models).then(function(course) {
                        if(course && course.Users[0].email == email) {
                            return done ("Sorry, but this email address is already in use by somebody.", null);
                        }

                        if(user) {
                            Models.Roles.insert(link.course_id, user_id, "student").then(function(role) {
                                if(!role) {
                                    return done("Apologies. I'm afraid there was an error registering you in this course, please try again later.", false);
                                } else {
                                    return done(null, user);
                                }
                            });
                        } else {
                            var generateHash = function(password) { return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null); };
                            var userPassword = generateHash(password);
                            var data = {email: email, password: userPassword };

                            userModel.create(data).then(function(newUser) {
                                if(!newUser) {
                                    return done("Terribly sorry, I'm afraid there was an error creating your account", false);
                                }

                                Models.Roles.insert(link.course_id, newUser.id, "student").then(function(role){
                                    if(!role){
                                        return done("Apologies. I'm afraid there was an error registering you to this course, please try again later.", false);
                                    } else {
                                        return done(null, newUser);
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    ));

    passportApp.use("local-signin", new LocalStrategy (
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },

        function(req, email, password, done) {
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            userModel.getUserIncludingPassword(null, email, Models).then(function(user) {
                if(!user) {
                    return done("Email does not exist", false);
                }

                if(!isValidPassword(user.password, password)) {
                    return done("Incorrect password", false);
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err) {
                console.log("Error: ", err);
                return done("Error with signing in", false);
            });
        }
    ));
}