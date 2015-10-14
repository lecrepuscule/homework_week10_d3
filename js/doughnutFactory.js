angular.module("doughnutApp")
.factory("DoughnutFactory", function($q,$http){

  var DoughnutFactory = {
    getDoughnuts:  function(){
      var deferred = $q.defer();
      $http
      .get("http://api.doughnuts.ga/doughnuts")
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
      return deferred.promise;
    },

    bakeDoughnut: function(freshDoughnut){
      var deferred = $q.defer();
      $http
      .post("http://api.doughnuts.ga/doughnuts",freshDoughnut)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
      return deferred.promise;
    },

    eatDoughnut: function(id){
    var deferred = $q.defer();
    $http
    .delete("http://api.doughnuts.ga/doughnuts/" + id)
    .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(error){
        deferred.reject(error);
      })
      return deferred.promise;
    }


  }

  return DoughnutFactory;
});

// DoughnutFactory.$inject=["$http"];
// DoughnutFactory.$inject=["$q"];


// function DoughnutFactory($q, $http){
//   console.log("got this far");
//   var deferred = $q.defer();

//   this.getDoughnuts= function(){
//     // var deferred = $q.defer();
//     $http
//     .get("http://api.doughnuts.ga/doughnuts")
//     .success(function(response){
//       deferred.resolve(response);
//     })
//     .error(function(error){
//       deferred.reject(error);
//     })
//     return deferred.promise;
//   }

// }