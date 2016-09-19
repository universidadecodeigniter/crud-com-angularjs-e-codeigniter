var app =  angular.module('main-App',['ngRoute','angularUtils.directives.dirPagination']);

app.config(['$routeProvider',

function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'templates/home.html',
    controller: 'AdminController'
  }).
  when('/notas', {
    templateUrl: 'templates/notas.html',
    controller: 'NotaController'
  });
}]);
