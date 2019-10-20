let date = new Date();
let str = "";

str += date.getFullYear() + '/';
str += date.getMonth() + 1 + '/';
str += date.getDate() + ' ';
str += date.getHours() + ':';
str += date.getMinutes() + ':';
str += date.getSeconds();
console.log(str); 