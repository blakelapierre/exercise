const noExercise = {
  description: 'Error',
  name: 'Error',
  tasks: [{
    description: 'Error',
    instructions: ['Error']
  }]
};

module.exports = ['$sce', $sce => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    scope: {
      'exercise': '=',
      'currentTask': '='
    },
    link($scope, element, attributes) {
      console.log({attributes});
    },
    controller: ['$scope', ($scope) => {
      $scope.$watch('exercise', exercise => {
        if (exercise) {
          const {tasks} = exercise;

          $scope.tasks = tasks;

          setTask(0);
        }
      });

      $scope.getDuration = () => {
        const {tasks} = $scope;

        return tasks.reduce((total, {quantity, task}) => {
          const {costs:{time:{setup, each, teardown}}} = task;

          return total + setup + quantity * each + teardown;
        }, 0);
      };

      $scope.getTaskDuration = taskIndex => {
        const {exercises, tasks} = $scope,
              {task, quantity} = tasks[taskIndex],
              {costs: {time: {setup, each, teardown}}} = task;

        return setup + quantity * each + teardown;
      };

      $scope.prevTask = () => {
        const {currentTask, exercise} = $scope,
              {index} = currentTask,
              {tasks} = exercise;

        if (index > 0) setTask(currentTask.index - 1);
      };

      $scope.nextTask = () => {
        const {currentTask, exercise} = $scope,
              {index} = currentTask,
              {tasks} = exercise;

        if (index < tasks.length - 1) setTask(currentTask.index + 1);
      };

      function setTask(index = 0) {
        const {tasks} = $scope;

        const task = tasks[index].task;

        $scope.currentTask = {
          index,
          task,
          safeTutorial: task.tutorial ? $sce.trustAsResourceUrl(task.tutorial) : undefined
        };
      }
    }]
  };
}];