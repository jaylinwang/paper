'use strict';

var updateCounter = function(Counter) {
    var query = new AV.Query('Counter');
    query.equalTo('url', location.pathname);
    query.first().then(function(counter) {
        if (counter) {
            counter.set('time', counter.get('time') + 1);
            counter.save().then(function(result) {
                console.log('update a counter:' + result.get('url'));
            }, function(error) {
                console.log('Error: ' + error.code + ' ' + error.message);
            });
        } else {
            var newCounter = new Counter();
            newCounter.set('url', location.pathname);
            newCounter.set('time', 1);
            newCounter.save().then(function(result) {
                console.log('add a counter:' + result.get('url'));
            }, function(error) {
                console.log('Error: ' + error.code + ' ' + error.message);
            });
        }
    }, function(error) {
        console.log('Error: ' + error.code + ' ' + error.message);
    });
};

var showTime = function(Counter) {
    var query = new AV.Query('Counter');
    $('.visit').each(function() {
        var url = $(this).data('url');
        var $this = $(this);
        query.equalTo('url', url);
        query.first().then(function(counter) {
            var time = 0;
            if (counter) {
                time = counter.get('time');
            }
            $this.find('.visit-count').text(time);
        }, function(error) {
            console.log('Error: ' + error.code + ' ' + error.message);
        });
    });
};