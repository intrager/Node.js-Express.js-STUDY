var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var template = {
    HTML:function (title, list, body, control) {     // html은 프로퍼티 이름. 그리고 함수 이름은 필요 없음
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB2 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
    },
    list:function (filelist) {
      var list = '<ul>';
      var i = 0;
      while(i < filelist.length) {
        list = list + `<li>
        <a href="/?id=${filelist[i]}">${filelist[i]}</a>
        </li>`;
        i = i + 1;
      }
      list = list + '</ul>';
      return list;
    }
}

// createServer는 Node.js로 웹 브라우저에 접속이 들어올 때마다 createServer의 callback 함수를 Node.js가 호출함
var app = http.createServer(function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
    if(pathname === '/') {  // 접속한 곳이 루트라면(path가 없는 경로)
      if( queryData.id === undefined) { // queryData.id 값이 없다면
        // 홈 디렉토리
          fs.readdir('./data', function(error, filelist) {
            var title = 'Welcome!';
            var description = 'Hello, Node.js';
            var list = template.list(filelist);
            var html = template.HTML(title, list,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>`
            );
            response.writeHead(200);
            response.end(html);  // 같은 경로에 있는 파일을 읽음
          });
      } else {
        fs.readdir('./data', function(error, filelist) {
          var filterdId = path.parse(queryData.id).base;
          fs.readFile(`data/${filterdId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
                allowedTags:['h1']
            });
            var list = template.list(filelist);
            var html = template.HTML(sanitizedTitle, list,
              `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              `<a href="/create">create</a>
               <a href="/update?id=${sanitizedTitle}">update</a>
               <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
               </form>
               `
            );
            response.writeHead(200);
            response.end(html);  // 같은 경로에 있는 파일을 읽음
          });
        });
      }
    } else if(pathname === '/create') {
      fs.readdir('./data', function(error, filelist) {
        var title = 'Web - create!';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, '');
        response.writeHead(200);
        response.end(html);  // 같은 경로에 있는 파일을 읽음
      });
    } else if (pathname === '/create_process') {
      var body = '';

      // 웹 브라우저가 post 방식으로 데이터를 전송할 때 데이터가 엄청 많으면, 그 데이터를 한 번에 처리 하다가는 프로그램이 꺼진다거나 컴퓨터에 무리가 가는 등 문제가 발생할 수 있음.
      request.on('data',function(data) {
          body = body + data;
          // Too much POST data, kill the connection!
          // 1e6 === 1 + Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          // if(body.length > 1e6)
          //   request.connection.destroy();
      });

      // 더 이상 들어올 정보가 없을 때, end 다음의 callback 함수 호출
      request.on('end', function() {
          var post = qs.parse(body);  // qs(querystring)이라는 모듈이 가지고 있는 parse 함수에다가 여태 저장한 body를 입력값으로 주면(객체화), post데이터에 post 정보가 들어있을 것임.
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
      });
    } else if (pathname === '/update') {
      fs.readdir('./data', function(error, filelist) {
        var filterdId = path.parse(queryData.id).base;
        fs.readFile(`data/${filterdId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `
            <form action="/update_process" method="post">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                <textarea name="description" placeholder="description">${description}</textarea>
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          response.end(html);  // 같은 경로에 있는 파일을 읽음
        });
      });
    } else if (pathname === '/update_process') {
      var body = '';
      request.on('data',function(data) {
          body = body + data;
      });
      request.on('end', function() {
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;
          fs.rename(`data/${id}`, `data/${title}`, function(error) {
            fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end();
            })
          })
      });
    } else if (pathname === '/delete_process') {
      var body = '';
      request.on('data',function(data) {
          body = body + data;
      });
      request.on('end', function() {
          var post = qs.parse(body);
          var id = post.id;
          var filterdId = path.parse(id).base;
          fs.unlink(`data/${filterdId}`, function(error) {
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {  // 이도 저도 아니면 404
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
