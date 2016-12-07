(function(){
  angular.module("ShoppingList",[])
  .service("ShoppingListCheckOffService",ShoppingListCheckOffService)
  .controller("ToBuyController",ToBuyController)
  .controller("DoneController",DoneController);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var ToBuy = this;
    ToBuy.items = ShoppingListCheckOffService.items;
    ToBuy.buy = ShoppingListCheckOffService.buy;
  }

  DoneController.$inject = ['ShoppingListCheckOffService'];
  function DoneController(ShoppingListCheckOffService){
    var DC = this;
    DC.items = ShoppingListCheckOffService.itemsDone;
  }

  function ShoppingListCheckOffService(){
    var svc = this;
    svc.items = [
      new ShoppingItem("RAM",8),
      new ShoppingItem("Motherboard", 10),
      new ShoppingItem("Mouse", 1),
      new ShoppingItem("Graphics Card", 4),
      new ShoppingItem("Keyboard", 1)
    ]
    svc.itemsDone = [];
    svc.buy = function(index){
      svc.items[index].isDone = true;
      svc.itemsDone.push(svc.items[index]);
      svc.items.splice(index,1);
    }
    return svc;
  }
  function ShoppingItem(name,qty){
    var item = this;
    item.name = name;
    item.qty = qty;
    item.isDone = false;
    return item;
  }
})();
