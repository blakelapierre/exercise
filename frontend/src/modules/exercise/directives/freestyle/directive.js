module.exports = () => ({
  restrict: 'E',
  template: require('./template.html'),
  controller: ['$scope', '$timeout', 'dataStore', ($scope, $timeout, dataStore) => {
    $scope.exercises = dataStore.getExercises();
    $scope.activities = [];

    $scope.plusOneBalloons = {};

    $scope.click = (exercise, count = 1) => {
      const {plusOneBalloons} = $scope;

      const e = plusOneBalloons[exercise.name] = plusOneBalloons[exercise.name] || {},
            balloons = e[count] = e[count] || [];

      balloons.push({created: new Date()});

      $timeout(() => balloons.shift(), 1250);

      while (count-- > 0) add(exercise);
    };

    $scope.analysis = {
      total: 0,
      stats: {}
    };

    const ops = [
      // Track counts
      (() => {
        const {analysis, exercises, misc} = $scope,
              {stats} = analysis;

        return item => {
          const {exercise: {id}} = item,
                exercise = exercises[id];

          const stat = stats[id] = stats[id] || {exercise, count: 0};

          stat.count++;
          analysis.total++;
        };
      })(),

      // Calc stats
      (() => {
        const {analysis} = $scope,
              {stats} = analysis;

        return item => {
          const {exercise:{id}} = item;

          const stat = stats[id];

          stat.relative = stat.count / analysis.total * 100;
        };
      })()
    ];

    let id = 0;
    function add(exercise) {
      const {activities} = $scope,
            item = {id: id++, exercise};

      ops.map(op => op(item));

      activities.unshift(item);

      if (activities.length > 5) activities.pop();
    }
  }]
});