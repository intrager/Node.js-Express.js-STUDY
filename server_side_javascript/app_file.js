var express = require('express'); // express 모듈 가져올게요
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();  // application객체라는 것을 리턴

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;
app.set('views', './views_file'); // views들을 views_file에다가
app.set('view engine', 'jade');
app.get('/topic/new', function(req, res){ // routing
  fs.readdir('data', function(err, files){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new',{topics:files});
  })
});
app.get(['/topic', '/topic/:id'], function(req, res) {  // []는 배열을 의미함. // topic에 특정한 parameter를 들고 오면
  fs.readdir('data', function(err, files){  // readdir을 통해서 data 디렉토리에 있는 파일 목록을 가져옴
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id) {  // id값이 있을 때
      fs.readFile('data/'+id, 'utf8', function(err, data) { // readfile을 통해서 id값에 해당되는 데이터를 읽어옴
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description: data}); // topic의 데이터로 files를 줌. title의 내용으로 id값을 줌 // topics와 title간 순서 상관 없음
      })
    } else { // id값이 없을 때
      // render를 사용할 때, 첫 번째 인자는 템플릿 파일의 이름, 두 번째 인자는 템플릿 파일 안으로 주입 하고자 하는 데이터를 객체 안에 담아서 주입한다.
      res.render('view', {topics:files, title:'Welcome', description:'Hello JavaScript for server.'}); // view라는 템플릿 사용
    }
  });
});
app.post('/topic', function(req, res) { // routing
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');  // 멘트가 이런 이유는 불특정 다수에게 자세한 에러를 보여줄 필요도 없고 악용될 수 있기 때문.
    }
    res.redirect('/topic/'+title);  // post로 넘어가서 처리 후 /topic/과 title이라는 값과 함께 리다이렉.
    // 이 사람이 작성한 정보의 상세보기 페이지로 사용자를 redirect. 보내버림
  });
})
app.listen(3000, function() {
  console.log('Connected, 3000 port!'); // 코드 실행 성공 결과, 콘솔 로그 출력
})
