var updateCounter = function (Counter) {
    var query = new AV.Query('Counter');
    query.equalTo('url', location.pathname);
    query.first().then(function (counter) {
        if (counter) {
            counter.set('time', counter.get('time') + 1);
            counter.save().then(function (result) {
                console.log('update a counter:' + result.get('url'));
            }, function (error) {
                console.log('Error: ' + error.code + ' ' + error.message);
            });
        } else {
            var newCounter = new Counter();
            newCounter.set('url', location.pathname);
            newCounter.set('time', 1);
            newCounter.save().then(function (result) {
                console.log('add a counter:' + result.get('url'));
            }, function (error) {
                console.log('Error: ' + error.code + ' ' + error.message);
            });
        }
    }, function (error) {
        console.log('Error: ' + error.code + ' ' + error.message);
    });
};

var showTime = function (Counter) {
    var query = new AV.Query('Counter');
    $('.visit').each(function () {
        var url = $(this).data('url');
        var $this = $(this);
        query.equalTo('url', url);
        query.first().then(function (counter) {
            var time = 0;
            if (counter) {
                time = counter.get('time');
            }
            $this.find('.visit-count').text(time);
        }, function (error) {
            console.log('Error: ' + error.code + ' ' + error.message);
        });
    });
};

(function ($) {
    hljs.initHighlightingOnLoad();

    $.get(ghost.url.api('posts', {fields: "id"})).done(function (data) {
        var postCount = data.posts.length;
        $('[data-toggle="postcount"]').text(postCount);
    }).fail(function (err) {
        console.log(err);
    });

    $.get(ghost.url.api('tags', {fields: "id"})).done(function (data) {
        var tagCount = data.tags.length;
        $('[data-toggle="tagcount"]').text(tagCount);
    }).fail(function (err) {
        console.log(err);
    });
    $.get(ghost.url.api('users/1')).done(function (data) {
        var user = data.users[0];
        $('[data-toggle="userimage"]').attr('src', user.image);
        $('[data-toggle="username"]').text(user.name);
        $('[data-toggle="userlocation"]').text(user.location);
        $('[data-toggle="userbio"]').text(user.bio);
    }).fail(function (err) {
        console.log(err);
    });

    if (AV) {
        $('.visit-wrapper').show();
        var Counter = AV.Object.extend('Counter');
        updateCounter(Counter);
        showTime(Counter);
    }
}(jQuery));