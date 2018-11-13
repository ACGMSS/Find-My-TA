angular.module('front-page', ['ngResource']);
angular.module('student', ['ngResource']);

// this will break because 'find-my-ta' is also defined in client/faculty/app.js
var app = angular.module('find-my-ta', ['front-page', 'student']);
