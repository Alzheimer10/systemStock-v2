'use strict';

/**
 * @ngdoc function
 * @name systemStockApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the systemStockApp
 */
angular.module('systemStockApp')
  .controller('FacturasCtrl',['$scope','$http','$uibModal','ngNotify', function ($scope,$http,$uibModal,ngNotify) {
    $scope.isCollapsed=true;
  	console.log($scope.isCollapsed);
    $scope.fact='';
    $scope.classmodificar=true;
    console.log($scope.classmodificar);
    $scope.modificar= function()
    {
      $scope.classmodificar=false;
      console.log($scope.classmodificar);
    }
     $http.post('controllers/facturas/getController.php')
          .then(function(response) 
          {
          console.log(response);
          if (response.data.mensaje == "success")
          { console.log(response);
            $scope.fact=response.data.data;
            //ngNotify.set('Sincronizado con exito');
         } 
          else
          {ngNotify.set('Ocurrio un error,intentelo nuevamente', 'error');}
          });
    

    $scope.abrir = function (factura,index){
      $scope.modal='';
        $scope.loading=true;
        $scope.modal=false;
        console.log($scope.loading,$scope.modal);
      //alert(factura.id);
     $http.post('controllers/facturas/findController.php',factura)
          .then(function(response) 
          {

          console.log(response);
          if (response.data.mensaje == "success")
          {
            $scope.modal=true;
          $scope.loading=false;
          console.log($scope.loading,$scope.modal);
            
            //ngNotify.set('Mostrando factura');
            $scope.modal=response.data.data;
         }
         else
        {ngNotify.set('Ocurrio un error,intentelo nuevamente', 'error');}
          });

        $scope.update=function()
        {
          $http.post('controllers/facturas/updateController.php',$scope.modal)
          .then(function(response) 
          {
            $scope.loading=true;
          console.log($scope.loading);
          console.log(response)
          if (response.data.mensaje == "success")
          { 
            
            ngNotify.set('Factura modificada con exito');
            $scope.fact[index]=$scope.modal;
            $scope.classmodificar=true;
            console.log($scope.classmodificar);
            $scope.loading=false;
            console.log($scope.loading);
          } 
         else
         {ngNotify.set('Ocurrio un error,intentelo nuevamente', 'error');}
          });
        }
        
        $scope.delete=function()
        {
          $http.post('controllers/facturas/deleteController.php',$scope.modal)
          .then(function(response) 
          {
               $scope.loading=true;
          console.log($scope.loading);
          console.log(response)
          if (response.data.mensaje == "success")
          { 
            
            ngNotify.set('Factura eliminada con exito');
            $scope.fact.splice(index,1);
            $scope.classmodificar=true;
            console.log($scope.classmodificar);
          $scope.loading=false;
          console.log($scope.loading);
          } 
         else
         {ngNotify.set('Ocurrio un error,intentelo nuevamente', 'error');}
          });

        }
      }
    
 	$scope.guardar=function(data)
 	{
 		 $http.post('controllers/facturas/addController.php',data)
          .then(function(response) 
          {
          console.log(response)
          if (response.data.mensaje == "success")
          { 
            
            ngNotify.set('Factura generada con exito');
            $scope.fact.push({id:response.data.id,cedula:data.ci,cliente:data.cliente,cel:data.cel,fecha:response.data.fecha});
            $scope.isCollapsed=true;
            console.log($scope.isCollapsed);
            data.id=response.data.id;
            data.fecha=response.data.fecha;
              
         } 
         else
         {ngNotify.set('Ocurrio un error,intentelo nuevamente', 'error');}
          });

  }
$scope.imprimir=function(model)
{
var data= angular.toJson(model);
window.open('controllers/facturas/facturaPDF.php?data='+data,'_blank');

}

  }]);
