angular.module("editTaskService", []).factory("editTask", [
  "$http",
  function($http) {
    return {
      getAll: function() {
        return $http.get("/edittask/all");
      },
      create: function(new_task) {
        return $http.post("/edittask/newtask", new_task);
      },
      update: function(task) {
        return $http.put("/edittask/task/" + task._id, task);
      },
      delete: function(task) {
        return $http.delete("/edittask/task/" + task._id, task);
      }
    };
  }
]);
