var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
app.use(helmet());

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next) {
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next(); // 미들 웨어 middle ware
  });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter); // topicRouter라고 하는 미들웨어를 적용하겠다

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {  // 위로 올리면 안 됨
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
