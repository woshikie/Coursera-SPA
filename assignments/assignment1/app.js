(function(){
  "use strict";
  angular.module("LunchCheck",[])
  .controller("LunchCheckController",LunchCheckController);

  function LunchCheckController($scope){
    $scope.dishes = "";
    $scope.message = "";
    $scope.objColor = "transparent";
    $scope.check = function(){
      var NumOfDishes = CountDishes($scope.dishes);
      if (NumOfDishes == 0){
        $scope.message = "Please enter data first";
        $scope.objColor = "red";
      }else{
        if (NumOfDishes < 4) $scope.message = "Enjoy!";
        else $scope.message = "Too much!";
        $scope.objColor = "green";
      }
    }
  }
  function CountDishes(dishes){
    var arr = dishes.split(',');
    var count = 0;
    for (var i = 0 ; i < arr.length; i++){
      if (arr[i].trim()) count++;
    }
    return count;
  }
})();
