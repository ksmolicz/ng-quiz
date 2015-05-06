'use strict';
/**
 * @ngdoc function
 * @name ngQuizApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('ngQuizApp')
  .controller('LoginCtrl', function ($scope, Auth, $location) {

    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {rememberMe: false}).then(redirect, showError);
    };

    function redirect() {
      $location.path('/');
    }

    function showError(err) {
      $scope.err = err;
    }

  });
