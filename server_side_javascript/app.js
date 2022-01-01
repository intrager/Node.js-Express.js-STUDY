var express = require('express');
var bodyParser = require('body-parser');  // req.body를 사용할 수 있게 해주는 api이용
var app = express();
app.locals.pretty = true; // 코드를 이쁘게
app.set('view engine', 'jade');
app.set('views', './views'); // views라는 이름의 폴더가 필요함
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })) // 미들웨어, express는 get은 지원하지만 post는 알아서 설치해서 이용해야함
app.get('/form', function(req, res) { // views 폴더에서 jade파일이 없으면 에러남
  res.render('form');
});
app.get('/form_receiver', function(req, res) {  // form method가 get
  var title = req.query.title;     // query를 통해서 받아옴
  var description = req.query.description;  // query를 통해서 받아옴
  res.send(title+','+description);
});
app.post('/form_receiver', function(req, res) { // form mehtod가 post
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + ',' + description);
})
app.get('/topic/:id', function(req, res) { // 사용자가 topic으로 들어왔을 때, get의 두 번째 인자로 전달 익명함수를
  // 우리가 아니라 express가 호출. 첫 번째 인자 값으로 req(request)라고 하는 이 객체를 전달하겠다고 약속
  // 두 번째 인자 값도 res(response)라는 객체를 전달하겠다고 약속
  // req객체가 가지고 있는 query라고 하는 객체의 name이라고 하는 프로퍼티를 통해서, 이 name이라고 하는 값을 알아낼 수 있음
  // 사용자가 query string으로 접속할 때 전달한 정보를 사용할 수 있다.
  // res.send(req.query.id);
  var topics = [
    'Javascript is...',
    'Nodejs is...',
    'Express is...'
  ]; // topics[]  // 0, 1, 2 라는 인덱스를 이용해 사용자가 id값으로 전달하려는 그 값을 여기다 넣으면 됨.
  // req.query.id 값에 따라 topic 배열에서 해당되는 element를 가져올 수 있다.
  //  ${topics[req.query.id]}   <a href="/topic?id=0">Javascript</a><br> 등/
  // req.params.id 같이 params를 사용하는 경우는 semantic URL을 사용할 때
  var output = `
  <a href="/topic/0">Javascript</a><br>
  <a href="/topic/1">Nodejs</a><br>
  <a href="/topic/2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
})
// 만약 topic 에서 다른 화면으로 넘기고 싶으면(예:edit화면)
app.get('/topic/:id/:mode',function(req, res){
  res.send(req.params.id+','+req.params.mode);
});
app.get('/param/:module_id/:topic_id', function(req, res) {
  res.json(req.params);
})
app.get('/template', function(req, res) {
   // 객체 전달(temp, time), 객체에 값을 넣어 전달
  res.render('temp', {time:Date(), _title:'Jade'});
})
app.get('/', function(req, res) {
  res.send('Hello home page');
});
app.get('/dynamic', function(req, res) {
  var lis = '';
  for(var i = 0; i < 5; i++) {
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  // ``는 작은 따옴표 아님, 변수 값은 ${}로 표현
  var output = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Dynamic!
      <ul>
      ${lis}
      </ul>
      ${time}
    </body>
  </html>`;
  res.send(output);
})
app.get('/route', function(req, res) {
  res.send('Hello Router, <img src="/route.png">')
})
app.get('/login', function(req, res){
  res.send('<h1>Login please</h1>');
})
app.listen(3000, function() {
  console.log('Connected 3000 port!');
});
