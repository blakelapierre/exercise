module.exports = () => {
  return {
    restrict: 'E',
    template: require('./template.html'),
    scope: {
      'workoutName': '@',
      'exerciseIndex': '@',
      'taskIndex': '@'
    },
    controller: ['$scope', 'dataStore', ($scope, dataStore) => {
      const db = dataStore.getDB();

      console.log({db});

      const workouts = dataStore.getWorkouts();

      $scope.workouts = workouts;

      $scope.$watch('workoutName', name => {
        console.log({name});

        const workout = $scope.workouts[name];

        if (!workout) throw new Error('Bad workout!', name);

        $scope.workout = workout;

        // setExercise(0);
      });

      $scope.$watch('exerciseIndex', (index) => {
        index = (index || 0) | 0;

        setExercise(index);
      });

      $scope.$watch('taskIndex', (index = 0) => {
        index = (index || 0) | 0;

        setTask(index);
      });

      $scope.prevExercise = () => {
        if ($scope.exerciseIndex > 0) {
          window.location.hash = `#/workout/${$scope.workout.id}/${$scope.exerciseIndex - 1}`;
        }
      };

      $scope.nextExercise = () => {
        const {workout: {exercises}} = $scope;

        if ($scope.exerciseIndex < (exercises.length - 1)) {
          window.location.hash = `#/workout/${$scope.workout.id}/${$scope.exerciseIndex + 1}`;
        }
      };

      function setExercise(index) {
        const {workout: {exercises}} = $scope,
              exercise = exercises[index];

        console.log('exercise', index);

        if (!exercise) throw Error('No Exercise!', index);

        $scope.exerciseIndex = index;
        $scope.exercise = exercise;

        setTask(0);
      }

      function setTask(index) {
        const {exercise: {tasks}} = $scope,
              task = tasks[index|0].task;

        console.log({tasks, index, task});

        if (!task) throw Error('No Task!', index);

        $scope.taskIndex = index;
        $scope.currentTask = task;
      }
    }]
  };
};