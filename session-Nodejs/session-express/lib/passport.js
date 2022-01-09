var db = require('../lib/db');

module.exports = function(app) {
    
    var authData = {
        email:'han@induk.ac.kr',
        password:'han',
        nickname:'hanjeongsoo'
    };
  
    var passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;
    
    app.use(passport.initialize());
    app.use(passport.session());  // 내부적으로 세션을 쓰겠다
    
    // Failed to serialize user into session 처리 방법
    passport.serializeUser(function(user, done) {
        console.log('serializeUser', user);
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        var user = db.get('users').find({id:id}).value();
        console.log('deserializeUser', id, user);
        done(null, user);
    });
    
    // 로그인 시도 시 소스
    passport.use(new LocalStrategy(
    {
     usernameField: 'email',
     passwordField: 'pwd'
    },
      function(username, password, done) {
        console.log('LocalStrategy', username, password);
        if(username === authData.email) {
          if(password === authData.password) { 
            return done(null, authData, {   // 성공
                message: 'Welcome'
            }); 
          } else {  // 비번 오류
            return done(null, false, { 
              message: 'Incorrect password.' 
            });
          }
        } else {  // 유저 없음
          return done(null, false, { 
            message: 'Incorrect username.' 
          });
        }
      }
    ));   
    return passport;
}