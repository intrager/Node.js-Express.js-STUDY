var v1 = 'v1';
// 100000
v1 = 'egoing';
var v2 = 'v2';

var p = {
  v1: 'v1',
  v2: 'v2',
  f1:function () {
    console.log(this.v1);  // 함수가 객체 안에서 사용될 때, 그 함수가 자신이 속해있는 객체를 참조할 수 있어야함
  },
  f2:function () {
    console.log(this.v2);
  }
}



p.f1();
p.f2();
