(function(){
  angular.module("NarrowItDownApp",[])
  .controller("NarrowItDownController",NarrowItDownController)
  .service("MenuSearchService",MenuSearchService)
  .directive("foundItems",FoundItemsDirective)
  .constant("API_ENDPOINT","https://davids-restaurant.herokuapp.com/menu_items.json");

  function FoundItemsDirective(){
    var DDO = {
      /*template: "<h1>HI</h1>",*/
      templateUrl: "FoundItems.html",
      restrict: 'E',
      scope:{
        foundItems: "<",
        onRemove: "&"
      },
      link: FoundItemsDirectiveLink,
      controller: FoundItemsController,
      controllerAs: "FIC",
      bindToController: true
    }
    return DDO;
  }
  function FoundItemsDirectiveLink(scope, element, attrs, controller){
    var FIDL = this;
    FIDL.hasInit = false;
    scope.$watch('FIC.hasItems()',function(newV,oldV){
      console.log("newV:"+newV+"oldV"+oldV);
      if (newV){
        element.find("table").fadeIn();
        element.find("h1").slideUp();
      }else{
        element.find("table").fadeOut();
        console.log(FIDL.hasInit);
        if (FIDL.hasInit){
          element.find("h1").slideDown();
        }
        else{
          element.find("h1").slideUp();
          FIDL.hasInit = true;
        }
      }
    });
    return FIDL;
  }
  function FoundItemsController(){
    var FIC = this;
    FIC.isDebugging = false;
    FIC.check = function(){
      console.log(FIC.foundItems);
    }
    FIC.hasItems = function(){
      return (FIC.foundItems != undefined && FIC.foundItems.length > 0);
    }

    return FIC;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MSS){
    var NIDC = this;
    NIDC.onRemove = function(index){
      NIDC.found.splice(index,1);
    }
    NIDC.doSearch = function(){
      MSS.getMatchedMenuItems(NIDC.searchTerm)
      .then(function onSuccess(result){
        NIDC.found = result;
        //console.log("NIDC.found",NIDC.found);
      }, function onError(result){
        console.log("Error!",result);
      });
    }
    return this;
  }
  MenuSearchService.$inject = ["$http","API_ENDPOINT"];
  function MenuSearchService($http,API_ENDPOINT){
    var MSS = this;
    MSS.getMatchedMenuItems = function(searchTerm){
      return $http({
        url:API_ENDPOINT
      }).then(function onSuccess(result){
        var foundItems = [];
        if (!searchTerm) return foundItems;
        var menu_items = result.data.menu_items;
        for(var i = 0 ; i < menu_items.length; i++){
          var index = menu_items[i].description.toLowerCase().indexOf(searchTerm);
          if ( index > -1){
            foundItems.push(menu_items[i]);
          }
        }
        return foundItems;
      });
    }
    return this;
  }
})();
