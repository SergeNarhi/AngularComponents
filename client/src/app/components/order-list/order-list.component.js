angular
  .module('app')
  .component('orderList', {
    templateUrl: 'app/components/order-list/order-list.template.html',
    bindings: {
      orders: '<'
    },
    controller: OrderListController
  });

function OrderListController($mdDialog, moment) {
  var vm = this;

  vm.orders.map(function (order) {
    order.summ = 0;
    order.items.forEach(function (item) {
      order.summ += item.cost;
    });
    return order;
  });

  vm.dateFilterValue = null;

  /**
   *  Show order details dialog.
   */
  vm.viewOrder = function (order, e) {
    $mdDialog
      .show({
        controller: 'ViewOrderController',
        controllerAs: 'ctrl',
        templateUrl: 'app/components/order-list/view-order-dialog/view-order-dialog.template.html',
        parent: angular.element(document.body),
        targetEvent: e,
        clickOutsideToClose: false,
        fullscreen: true, // Only for -xs, -sm breakpoints.
        locals: {
          order: order
        }
      })
      .then(function () {
        // For save maybe
      }, function () {
        // Closed or canceled
      });
  };

  vm.dateFiltered = function (query) {
    return query ? vm.orders.filter(vm.createFilter(query)) : vm.orders;
  };

  vm.clearFilter = function () {
    vm.dateFilterValue = null;
  };

  vm.createFilter = function createFilterFor(query) {
    var queryDate = new Date(query);
    return function filterFn(item) {
      var itemDate = new Date(item.dateFrom);
      return moment([
        queryDate.getFullYear(),
        queryDate.getMonth(),
        queryDate.getDate()
      ])
        .isSame([
          itemDate.getFullYear(),
          itemDate.getMonth(),
          itemDate.getDate()
        ]);
    };
  };
}
