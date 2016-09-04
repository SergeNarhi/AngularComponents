'use strict';
var app = require('../../server/server');
var MAX_LIMIT = 10;

module.exports = function (Order) {
  Order.add = function (order, cb) {
    console.log(arguments)
    var newClient = order.client;
    var newOrder = {
      addressFrom: order.addressFrom,
      addressTo: order.addressTo,
      dateFrom: new Date(order.dateFrom),
      dateTo: new Date(order.dateTo),
      items: order.items || []
    };

    if (!newClient.name || !newClient.phone) {
      var clientError = new Error('Invalid client data');
      clientError.statusCode = 400;
      return cb(clientError);
    }

    if (
      !newOrder.addressFrom || !newOrder.addressTo || !newOrder.dateFrom || !newOrder.dateTo || newOrder.items.length === 0
    ) {
      var orderError = new Error('Invalid order data');
      orderError.statusCode = 400;
      return cb(orderError);
    }

    app.models.Client.create(newClient, function (err, savedClient) {
      if (err) return cb(err);

      newOrder.clientId = savedClient.id;
      Order.create(newOrder, function (err, savedOrder) {
        cb(err, savedOrder);
      });
    });
  };

  Order.remoteMethod(
    'add',
    {
      accepts: [
        {arg: 'order', type: 'object', required: true}
      ],
      http: {path: '/add', verb: 'post'},
      returns: [
        {arg: 'order', type: 'object', root: true}
      ]
    }
  );

  Order.list = function (query, pageOptions, cb) {
    var filter = {
      skip: 0,
      limit: MAX_LIMIT,
      order: 'dateFrom desc',
      where: {},
      include: {
        relation: 'client',
        scope: {
          fields: ['name', 'phone', 'id']
        }
      }
    };

    if (pageOptions) {
      filter.skip = pageOptions.skip ? pageOptions.skip : filter.skip;
      filter.limit = pageOptions.limit ? pageOptions.limit : filter.limit;
    }

    filter.where = query ? query : filter.where;

    Order.find(filter, function (err, orders) {
      cb(err, orders);
    })
  };

  Order.remoteMethod(
    'list',
    {
      accepts: [
        {arg: 'query', type: 'object', required: false},
        {arg: 'pageOptions', type: 'object', required: false}
      ],
      http: {path: '/list', verb: 'get'},
      returns: [
        {arg: 'orders', type: ['object'], root: true}
      ]
    }
  );
};
