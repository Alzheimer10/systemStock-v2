'use strict';

/**
 * @ngdoc function
 * @name systemStockApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the systemStockApp
 */
angular.module('systemStockApp')
  .controller('InventarioCtrl',['$scope','$http','ngNotify', function ($scope,$http,ngNotify) {
  $scope.botao1 = function() {
   
   // alert('Ok!');
  }
  var url='http://localhost/GitHub/systemStock/app/backend/web/app_dev.php/inventario';
  	$scope.isCollapsed=true;
  	console.log($scope.isCollapsed);
    $scope.nuevo={};
    $scope.items='';
    $http.get(url+'/getInventario')
          .then(function(response) 
          {
          console.log(response.data)

          if (response.data.mensaje == "success")
            {$scope.items=JSON.parse(response.data.datos)} 
          else
            {ngNotify.set('Ocurrio un error al conectar, actualize la pagina para intentarlo nuevamente', 'error');}
          });
  	
     $scope.openmodal=function(item,index)
    {
      $scope.update='';
      $scope.update=angular.copy(item);
      $scope.guardar=function(data)
      {
        
        
         $http.post(url+'/editar',data)
            .then(function(response) 
            {
            console.log(response.data)
            if (response.data.mensaje == "success")
            {
              ngNotify.set('Inventario modificado');
              $scope.items[index]=data;
            } 
            else
            {
              ngNotify.set('Ocurrio un error,intentelo nuevamente', 'error');
            }
            });
      }
    }
  	$scope.delete=function(item,index)
  	{
      $http.post(url+'/eliminar',item)
          .then(function(response) 
          {
          console.log(response.data)
          if (response.data.mensaje == "success")
          {
            ngNotify.set('Producto eliminado exito');
            $scope.items.splice(index,1);
          } 
          else
          {ngNotify.set('Ocurrio un error,intentelo nuevamente', 'error');}
          });
  	}
  	$scope.add=function(nuevo)
  	{	
      $http.post(url+'/nuevo',nuevo)
          .then(function(response) 
          {
          console.log(response)
          if (response.data.mensaje == "success")
          {
          $scope.isCollapsed=true;
          console.log($scope.isCollapsed);
          ngNotify.set('Producto agregado con exito');
          $scope.items.push({id:response.data.id,name:nuevo.name,price:nuevo.price,mount:nuevo.mount});
          $scope.nuevo.name='';
          $scope.nuevo.mount='';
          $scope.nuevo.price='';
         } 
          else
          {ngNotify.set('Ocurrio un error,intentelo nuevamente', 'error');}
          });

  	}

  }]);
