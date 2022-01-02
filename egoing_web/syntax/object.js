var members = ['egoing', 'k8805', 'dooly'];
console.log(members[1]);  // k8805
var i = 0;
while(i < members.length) {
  console.log('array loop',members[i]);
  i = i + 1;
}

var roles = {
  'programmer':'egoing',
  'designer':'k8805',
  'manager':'dooly'
}

console.log(roles.designer);  // k8805
console.log(roles['designer']);  // k8805

for(var name in roles) {  // 첫 번째 자리에는 변수, in 키워드 뒤에는 반복적으로 처리하려고 하는 객체
  console.log('object => ', name, 'value => ', roles[name]);  // roles[키] : [키]에 해당되는 정보 가져옴
}
