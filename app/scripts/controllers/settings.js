'use strict';

angular.module('ngQuizApp')
  .controller('SettingsCtrl', function ($scope, $firebaseArray, Ref) {

    $scope.add = {};
    $scope.answerArray = [];
    $scope.selectAnswer = [
      {label: 'Prawda', value: true},
      {label: 'Fałsz', value: false}
    ];

    $scope.addAnswer = function(){
      $scope.answerArray.push({name: $scope.add.answer, isAnswer: $scope.add.isAnswer});
    };

    $scope.addQuestion = function(){

      var questions =  $firebaseArray(Ref.child('data'));
      questions.$add({
        question: $scope.add.question,
        answers: $scope.answerArray
      });
    };
  });
