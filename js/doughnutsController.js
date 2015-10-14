angular.module("doughnutApp").controller("DoughnutsController", DoughnutsController);

function DoughnutsController(DoughnutFactory){
  var vm = this;

  vm.all = [];
  vm.freshDoughnut = {};

  DoughnutFactory.getDoughnuts()
  .then(function(response){
      console.log(response);
      vm.all = response;
  })

  vm.create = function(){
    DoughnutFactory.bakeDoughnut(vm.freshDoughnut)
    .then(function(response){
      console.log(response);
      vm.all.push(response);
      vm.freshDoughnut = {};
    })
  }

  vm.fiddleDoughnut = function(doughnut){
    console.log("clicked on " + doughnut.id);
    var data = {
      flavor: doughnut.flavor,
      style: doughnut.style
    }

    $http
    .put("http://api.doughnuts.ga/doughnuts/" + doughnut.id, data)
    .then(function(response){
      console.log(response);
      if (response.status === 200){
        delete doughnut.fiddling;
      };
    });
  };

  vm.cancelFiddling = function(id, index){
    console.log("id is " + id);
    console.log("index is " + index);
    $http
    .get("http://api.doughnuts.ga/doughnuts/" + id)
    .then(function(response){
      console.log(response);
      vm.all.splice(index, 1, response.data)
    })
  }

  vm.eatDoughnut = function(id){
    $http
    .delete("http://api.doughnuts.ga/doughnuts/" + id)
    .then(function(response){
      console.log(response);
      if (response.status === 200){
        vm.all = vm.all.filter(function(doughnut){
          return doughnut.id !== id;
        });
      };
    });
  };

  // vm.getDoughnuts();

};