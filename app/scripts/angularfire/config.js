angular.module('firebase.config', [])
  .constant('FBURL', 'https://ng-quiz.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['facebook'])
  .constant('loginRedirectPath', '/login');
