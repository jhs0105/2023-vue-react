"use strict";

/*

    ES2015의 template literal( 백틱, ``) 에 대해서 알아본다.
    백틱: 여러줄 & 변수값을 자동으로 치환기능
*/

var string1 = '안녕하세요';
var string2 = '반갑습니다';
var greeting = "".concat(string1, ", ").concat(string2);
console.log(greeting);
var product = {
  name: '도서',
  price: '4200원'
};
var message = "\n\n\uC81C\uD488 ".concat(product.name, "\uC758 \uAC00\uACA9\uC740 ").concat(product.price, " \uC785\uB2C8\uB2E4.\n\nend\n");
console.log(message);