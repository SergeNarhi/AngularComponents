'use strict';

var initServices = [
  {
    name: 'Первая стиралка',
    address: 'ул. Мира, 587/6'
  },
  {
    name: 'Лучшая прачечная',
    address: 'ул. Ленина, 12'
  },
  {
    name: 'Быстрая чистка',
    address: 'ул. Жукова, 1Д'
  }
];

module.exports = function enableAuthentication(app) {
  app.models.Service.count({}, function (err, count) {
    console.log(arguments);
    if (count === 0) {
      app.models.Service.create(
        initServices,
        function (err, data) {
          console.log(arguments);
        })
    }
  });
};
