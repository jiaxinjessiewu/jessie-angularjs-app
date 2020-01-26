// public/js/appRoutes.js
angular.module("appRoutes", []).config([
  "$routeProvider",
  "$locationProvider",
  function($routeProvider, $locationProvider) {
    $routeProvider

      // home page
      .when("/", {
        templateUrl: "views/home.html",
        controller: "MainController"
      })
      .when("/edittask", {
        templateUrl: "views/edittask.html",
        controller: "editTaskController"
      })
      .otherwise({
        redirectTo: "/"
      });

    $locationProvider.html5Mode(true);
  }
]);
