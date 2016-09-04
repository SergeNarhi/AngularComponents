(function () {
  'use strict';

  angular
    .module('app')
    .component('headerComponent', {
      templateUrl: 'app/shared/header/header.template.html',
      controller: Header
    });

  function Header() {
  }
})();
