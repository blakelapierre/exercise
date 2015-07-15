module.exports = () => ({
  restrict: 'E',
  template: require('./template.html'),
  controller: ['$scope', 'dataStore', ($scope, dataStore) => {
    $scope.exercises = dataStore.getExercises();
    $scope.activities = [];

    $scope.click = exercise => {
      console.log(exercise);
      add(exercise);
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
          console.log({stats});
          const {exercise: {id}} = item,
                exercise = exercises[id];

          const stat = stats[id] = stats[id] || {exercise, count: 0};

          stat.count++;
          analysis.total++;
        };
      })(),

      // Calc stats
      (() => {
        console.log('stats');
        const {analysis} = $scope,
              {stats} = analysis;

        return item => {
          const {exercise:{id}} = item;

          const stat = stats[id];

          stat.relative = stat.count / analysis.total * 100;

          console.log({stat});
        };
      })()
    ];

    let id = 0;
    function add(exercise) {
      const {activities} = $scope,
            item = {id: id++, exercise};

      ops.map(op => op(item));

      activities.unshift(item);
    }
  }]
});