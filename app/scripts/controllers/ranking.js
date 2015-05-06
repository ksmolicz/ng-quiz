'use strict';

angular.module('ngQuizApp')
  .controller('RankingCtrl', function ($scope, $firebaseArray, Auth, Ref) {

    Auth.$unauth();
    $scope.ranking = $firebaseArray(Ref.child('ranking'));

  });
