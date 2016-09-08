(function () {
  'use strict';

  angular
    .module('app')
    .component('order', {
      templateUrl: 'app/components/order/order.template.html',
      bindings: {
        services: '<'
      },
      controller: OrderController
    });

  function OrderController($mdToast, OrderService) {
    var vm = this;

    vm.selectedItem = null;
    vm.searchText = null;
    vm.items = loadItems();

    // TODO: Move to service.
    /**
     * Initialize static items.
     * @returns {Array}
     */
    function loadItems() {
      var initialItems = [
        {
          name: 'Рубаха',
          type: 'Верх',
          cost: 100
        },
        {
          name: 'Штаны',
          type: 'Низ',
          cost: 150
        },
        {
          name: 'Туфельки',
          type: 'Обувь',
          cost: 11
        },
        {
          name: 'Шляпка',
          type: 'Шляпs',
          cost: 90
        },
        {
          name: 'Панталоны',
          type: 'Партки',
          cost: 200
        }
      ];

      return initialItems.map(function (item) {
        item._lowername = item.name.toLowerCase();
        item._lowertype = item.type.toLowerCase();
        return item;
      });
    }

    vm.initOrder = function () {
      return {
        client: {
          name: '',
          phone: ''
        },
        service: '',
        addressFrom: '',
        addressTo: '',
        dateFrom: '',
        dateTo: '',
        items: []
      };
    };

    vm.order = vm.initOrder();

    /**
     * Show toast notification for 3s.
     * @param message Message to show.
     */
    vm.toast = function (message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position({
            top: true,
            right: true
          })
          .hideDelay(3000)
      );
    };

    /**
     * Send order to server.
     */
    vm.addOrder = function (form) {
      OrderService.add(vm.order).$promise
        .then(function () {
          vm.order = vm.initOrder();
          if (form) {
            form.$setPristine();
            form.$setUntouched();
          }
          vm.toast('Заказ добавлен!');
        })
        .catch(function () {
          vm.toast('Произошла ошибка!');
        })
    };

    /**
     * Return the proper object when the append is called.
     */
    vm.transformItem = function transformItem(item) {
      // If it is an object, it's already a known chip item
      if (angular.isObject(item)) {
        return item;
      }
      // Otherwise, create a new one
      return {name: item, type: 'Другое'};
    };

    /**
     * Search for vegetables.
     */
    vm.querySearch = function querySearch(query) {
      return query ? vm.items.filter(vm.createFilterFor(query)) : [];
    };

    /**
     * Create filter function for a query string
     */
    vm.createFilterFor = function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (item._lowername.indexOf(lowercaseQuery) === 0) ||
          (item._lowertype.indexOf(lowercaseQuery) === 0);
      };
    };
  }
})();
