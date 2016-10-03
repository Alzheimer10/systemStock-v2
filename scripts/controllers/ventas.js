'use strict';

/**
 * @ngdoc function
 * @name systemStockApp.controller:VentasCtrl
 * @description
 * # VentasCtrl
 * Controller of the systemStockApp
 */
angular.module('systemStockApp')
  .controller('VentasCtrl',['$scope','$http','ngNotify', function ($scope,$http,ngNotify) {
   
    $scope.items='';
    $http.get('controllers/inventario/getController.php')
          .then(function(response) 
          {
          console.log(response.data)
          if (response.data.mensaje == "success")
          {$scope.items=response.data.data} 
          else
            {ngNotify.set(response.data, 'error');}
          });
  	
   	$scope.rest=function(item,modal)
  	{
      if(item.mount-modal.change<0)
      {
        ngNotify.set('Error cantidad no valida', 'error');
      }
      else
      {
      var data =[{id: item.id},{mount:item.mount-modal.change}];
      $http.post('controllers/inventario/updateController.php',data)
          .then(function(response) 
          {
          console.log(response.data)
          if (response.data.mensaje == "success")
          {
          	ngNotify.set('Vendido Con exito');
          	item.mount-=modal.change;
          	modal.change='';
          } 
          else
          {
          	ngNotify.set('Ocurrio un error,intentelo nuevamente', 'error');
          }
          });
      }
  	}
  }]);
