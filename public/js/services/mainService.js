angular.module("mainService", []).factory("main", [
  "$http",
  function($http) {
    return {
      // call to get all tasks
      getDailyTasks: function() {
        return $http.get("/dailytasks");
      },
      update_task: function(task) {
        return $http.put("/update/" + task._id, task);
      }
    };
  }
]);
