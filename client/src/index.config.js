(function () {
  'use strict';

  angular.module('app')
    .config(configLoadingBar)
    .config(configDateLocale);

  function configLoadingBar(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }

  function configDateLocale($mdDateLocaleProvider, moment) {
    $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'DD.MM.YYYY', true);
      return m.isValid() ? m.toDate() : new Date();
    };
    $mdDateLocaleProvider.formatDate = function(date) {
      var m = moment(date);
      return m.isValid() ? m.format('DD.MM.YYYY') : '';
    };
  }
})();
