(function () {
  'use strict';

  angular
    .module('app')
    .service('OrderService', orderService);

  function orderService(Order, $q) {
    var vm = this;

    vm.add = function (data, successCb, errorCb) {
      return Order.add({order: data}, successCb, errorCb);
    };

    vm.list = function (filter, pageOptions, successCb, errorCb) {
      return Order.list(filter, pageOptions, successCb, errorCb);
    };
  }
})();
