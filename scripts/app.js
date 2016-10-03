'use strict';

/**
 * @ngdoc overview
 * @name systemStockApp
 * @description
 * # systemStockApp
 *
 * Main module of the application.
 */
angular
  .module('systemStockApp', [
    'ngRoute',
    'ui.bootstrap',
    'ngNotify'
    
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/inventario', {
        templateUrl: 'views/inventario.html',
        controller: 'InventarioCtrl',
        controllerAs: 'inventario'
      })
      .when('/facturas', {
        templateUrl: 'views/facturas.html',
        controller: 'FacturasCtrl',
        controllerAs: 'facturas'
      })
      .when('/ventas', {
        templateUrl: 'views/ventas.html',
        controller: 'VentasCtrl',
        controllerAs: 'ventas'
      })
      .when('/home', {
        templateUrl: 'views/home.html'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })
.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><div><div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div></div><span>loading</span></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  });
