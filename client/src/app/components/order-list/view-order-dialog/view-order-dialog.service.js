(function () {
  'use strict';

  angular
    .module('app')
    .controller('ViewOrderController', ViewOrderController);

  function ViewOrderController($mdDialog, order) {
    var vm = this;

    vm.order = order;

    vm.close = function () {
      $mdDialog.cancel();
    };
  }
})();
