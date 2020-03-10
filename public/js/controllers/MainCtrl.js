// public/js/controllers/MainCtrl.js
angular
  .module("MainCtrl", ["mainService"])
  .controller("MainController", function($scope, main) {
    $scope.date_now = new Date();
    $scope.date = {};
    $scope.date.past = false;
    $scope.today_meme = "Keep Studying!!";
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    var start = new Date();
    start.setHours(0, 0, 0, 0);
    var end = new Date();
    end.setHours(23, 59, 59, 999);
    var deal_time =
      weekday[end.getDay()] +
      ", " +
      month[end.getMonth()] +
      " " +
      end.getDate() +
      " " +
      end.getFullYear() +
      ", " +
      end.toLocaleTimeString();

    $scope.today_tasks = {
      deal_time: deal_time,
      meme: "Keep Learning!!",
      tasks: [
        {
          title: "Update Portfolio",
          details:
            "Projects part in personal website, personal website's font-end improvement",
          finish: false
        },
        {
          title: "Github daily update",
          details:
            "Keep coding everyday and update on github, improve efficiency",
          finish: false
        },
        {
          title: "Learning for 2 hrs (JS, FED, DS, etc..)",
          details:
            "Keep coding everyday and update on github, improve efficiency",
          finish: false
        }
      ]
    };
    var count_down_date = end.getTime();
    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = count_down_date - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(x);
        var days = 0;
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
      }

      if (document.getElementById("days")) {
        document.getElementById("days").innerHTML = days;
      }
      if (document.getElementById("hours")) {
        document.getElementById("hours").innerHTML = hours;
      }
      if (document.getElementById("minutes")) {
        document.getElementById("minutes").innerHTML = minutes;
      }
      if (document.getElementById("seconds")) {
        document.getElementById("seconds").innerHTML = seconds;
      }
    }, 1000);

    function getDailyTasks() {
      main
        .getDailyTasks()
        .success(function(tasks) {
          tasks.forEach(task => {
            if (
              new Date(task.due_date).setHours(0, 0, 0, 0) ==
              new Date().setHours(0, 0, 0, 0)
            ) {
              $scope.today_tasks.tasks.push({
                title: task.title,
                details: task.details,
                finish: task.finish,
                due_date: task.due_date,
                _id: task._id
              });
            }
          });
        })
        .error(function(error) {
          console.log("getDailyTasks error: ", error);
        });
    }
    getDailyTasks();

    $scope.finish_task = function(task) {
      if (task._id) {
        task.finish = true;
        return main
          .update_task(task)
          .success(function(results) {})
          .error(function(error) {
            console.log("update tasks error: ", error);
          });
      }
    };
  });
