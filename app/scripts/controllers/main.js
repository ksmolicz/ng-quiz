'use strict';

/**
 * @ngdoc function
 * @name ngQuizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngQuizApp
 */
angular.module('ngQuizApp')
  .controller('MainCtrl', function ($scope, $firebaseArray, $firebaseObject, Auth, $filter, Ref) {

    $scope.authData = Auth.$getAuth();
    $scope.questions = $firebaseArray(Ref.child('data'));
    $scope.quizDone = false;
    $scope.selectedAnswer = [];
    $scope.currentQuestion = 0;
    $scope.score = 0;

    var currentDate = $filter('date')(new Date(), 'shortDate');
    var ranking = Ref.child('ranking/'+$scope.authData.facebook.id);
    var data = $firebaseObject(ranking);

    data.$loaded().then(function(){

      $scope.appLoaded = true;

      if(data.lastDone === currentDate){
        $scope.doneToday = true;
      }

      $scope.submitAnswer = function(index){

        $scope.questions.$loaded().then(function(){
          var answer = $firebaseObject(Ref.child('data/'+$scope.questions.$keyAt(index)+'/answers/'+$scope.selectedAnswer[index]));
          answer.$loaded().then(function(){
            if(answer.isAnswer === true){

              $scope.score += 1;

            }

            $scope.currentQuestion += 1;

            if($scope.currentQuestion === $scope.questions.length){

              $scope.$broadcast('timer-stop');
              $scope.quizDone = true;

              if($scope.score < data.score){

                ranking.child('lastDone').set(currentDate);
                return;

              }else if($scope.score === data.score && $scope.time > data.time){

                ranking.child('lastDone').set(currentDate);
                return;
              }

              ranking.set({
                score: $scope.score,
                name: $scope.authData.facebook.displayName,
                time: $scope.time.seconds,
                lastDone: currentDate
              });

            }
          });
        });
      };

      $scope.$on('timer-stopped', function (event, data){
        $scope.time = data;
      });

    });

  });


